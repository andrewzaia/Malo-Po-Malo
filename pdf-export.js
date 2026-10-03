(function () {
  'use strict';
  // Small self-contained PDF 1.7 writer. Embedded Type 0 font and ToUnicode
  // mappings preserve Serbian text in both scripts, without a CDN or server.
  const F=window.SerbianPDFFont, encoder=new TextEncoder();
  const bytes=text=>encoder.encode(text);
  const decode=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
  const join=parts=>{const out=new Uint8Array(parts.reduce((n,p)=>n+p.length,0));let offset=0;parts.forEach(p=>{out.set(p,offset);offset+=p.length;});return out;};
  const hex=code=>code.toString(16).padStart(4,'0').toUpperCase();
  const clean=value=>String(value).replace(/[\r\n\t\u00a0]/g,' ').replace(/\s+/g,' ').trim();
  const encodeText=text=>[...clean(text)].map(c=>hex(F.widths[c.codePointAt(0)]===undefined?63:c.codePointAt(0))).join('');
  const width=(text,size)=>[...clean(text)].reduce((n,c)=>n+(F.widths[c.codePointAt(0)]??F.widths[63]),0)*size/1000;
  const color={ink:'0.09 0.16 0.29',muted:'0.35 0.40 0.50',blue:'0.14 0.30 0.89',correct:'0.09 0.38 0.26',incorrect:'0.58 0.27 0.18',missed:'0.52 0.32 0.04'};
  const duration=ms=>{const seconds=Math.round(ms/1000);return Math.floor(seconds/60)+'m '+String(seconds%60).padStart(2,'0')+'s';};
  function wrap(text,size,maxWidth) {
    const words=clean(text).split(' '),lines=[];let line='';
    for(const word of words){
      if(width(word,size)>maxWidth){
        if(line){lines.push(line);line='';}
        let segment='';for(const c of word){if(width(segment+c,size)>maxWidth){lines.push(segment);segment='';}segment+=c;}line=segment;
      }else if(line&&width(line+' '+word,size)>maxWidth){lines.push(line);line=word;}else line+=(line?' ':'')+word;
    }
    if(line)lines.push(line);return lines.length?lines:[''];
  }
  function create(report) {
    if(!report||report.results.length!==100)throw new Error('A completed 100-question report is required.');
    const pages=[],W=595.28,H=841.89,M=42,BOTTOM=62;let page,y;
    const text=(value,x,baseline,size=10.5,tone='ink')=>page.push(`BT /F1 ${size} Tf ${color[tone]} rg 1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm <${encodeText(value)}> Tj ET\n`);
    const rule=baseline=>page.push(`0.86 0.89 0.94 RG 0.7 w ${M} ${baseline.toFixed(2)} m ${W-M} ${baseline.toFixed(2)} l S\n`);
    const newPage=()=>{page=[];pages.push(page);text('MALO PO MALO / SERBIAN PRACTICE',M,H-38,9,'blue');rule(H-49);y=H-80;};
    const paragraph=(value,size=10.5,tone='ink',gap=6)=>{for(const line of wrap(value,size,W-M*2)){if(y<BOTTOM+16)newPage();text(line,M,y,size,tone);y-=size*1.45;}y-=gap;};
    newPage();
    paragraph('Your test results',26,'ink',14);
    paragraph('100 mixed questions - one minute per question',11,'muted',12);
    paragraph(report.score+' / 100 correct   ('+report.percent+'%)',23,'blue',16);
    paragraph(report.counts.correct+' correct   |   '+report.counts.incorrect+' incorrect   |   '+report.counts.missed+' missed',12,'ink',16);
    paragraph('Started: '+new Date(report.startedAt).toLocaleString('en-AU',{timeZoneName:'short'}),10.5,'muted');
    paragraph('Completed: '+new Date(report.completedAt).toLocaleString('en-AU',{timeZoneName:'short'}),10.5,'muted');
    paragraph('Time used: '+duration(report.durationMs)+'   |   Answer script: '+(report.script==='cyrillic'?'Cyrillic':'Latin'),10.5,'muted',16);
    if(report.endedEarly)paragraph('Test ended early. All remaining unanswered questions are marked missed.',10.5,'missed',12);
    rule(y);y-=29;paragraph('By lesson',16,'ink',10);
    for(const topic of report.topics)paragraph(topic.title+': '+topic.correct+' / '+topic.total+' correct, '+topic.incorrect+' incorrect, '+topic.missed+' missed',11,'ink',8);
    y-=10;paragraph('Review follows on the next pages. Each item includes your answer, the correct answer, and a short explanation.',10.5,'muted',10);
    paragraph('Missed means the minute expired or the test was ended before an answer was submitted. Scores use all 100 questions.',10.5,'muted');
    newPage();
    for(const row of report.results){
      const topic=report.topics.find(t=>t.id===row.topic).title;
      const entries=[
        {text:'Question '+row.number+' / '+topic+' / '+row.status.toUpperCase(),size:10,tone:row.status,gap:5},
        {text:row.prompt,size:11,tone:'ink',gap:5},
        {text:'Your answer: '+(row.selected===null?row.reason:row.selected),size:10.5,tone:'ink',gap:3},
        {text:'Correct answer: '+row.answer,size:10.5,tone:'blue',gap:3},
        {text:row.explanation,size:10,tone:'muted',gap:11}
      ];
      const height=entries.reduce((n,e)=>n+wrap(e.text,e.size,W-M*2).length*e.size*1.45+e.gap,0)+12;
      if(y-height<BOTTOM)newPage();
      entries.forEach(e=>paragraph(e.text,e.size,e.tone,e.gap));rule(y+2);y-=14;
    }
    pages.forEach((commands,index)=>{page=commands;text('Malo po malo - 100-question test',M,32,8.5,'muted');const label='Page '+(index+1)+' of '+pages.length;text(label,W-M-width(label,8.5),32,8.5,'muted');});
    return serialize(pages,W,H,report);
  }
  function serialize(pages,W,H,report) {
    const objects=[null],add=data=>{objects.push(typeof data==='string'?bytes(data):data);return objects.length-1;};
    const stream=(data,extra='')=>join([bytes(`<< /Length ${data.length} ${extra} >>\nstream\n`),data,bytes('\nendstream')]);
    const catalog=add(''),pageTree=add('');
    const fontFile=add(stream(decode(F.bytes),'/Length1 '+decode(F.bytes).length));
    const mapping=add(stream(decode(F.mapping)));
    const descriptor=add(`<< /Type /FontDescriptor /FontName /${F.name} /Flags 32 /FontBBox [${F.bbox.join(' ')}] /ItalicAngle 0 /Ascent ${F.ascent} /Descent ${F.descent} /CapHeight ${F.ascent} /StemV 80 /FontFile2 ${fontFile} 0 R >>`);
    const widths=Object.entries(F.widths).map(([code,value])=>code+' ['+value+']').join(' ');
    const cidFont=add(`<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${F.name} /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${descriptor} 0 R /DW 1000 /W [${widths}] /CIDToGIDMap ${mapping} 0 R >>`);
    const chars=Object.keys(F.widths).map(Number);let cmap='/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /MaloPoMaloUnicode def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n';
    for(let i=0;i<chars.length;i+=100){const chunk=chars.slice(i,i+100);cmap+=chunk.length+' beginbfchar\n'+chunk.map(c=>'<'+hex(c)+'> <'+hex(c)+'>').join('\n')+'\nendbfchar\n';}
    cmap+='endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend';
    const unicode=add(stream(bytes(cmap)));
    const font=add(`<< /Type /Font /Subtype /Type0 /BaseFont /${F.name} /Encoding /Identity-H /DescendantFonts [${cidFont} 0 R] /ToUnicode ${unicode} 0 R >>`);
    const pageIds=pages.map(commands=>{const contents=add(stream(bytes(commands.join(''))));return add(`<< /Type /Page /Parent ${pageTree} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${contents} 0 R >>`);});
    objects[catalog]=bytes(`<< /Type /Catalog /Pages ${pageTree} 0 R >>`);
    objects[pageTree]=bytes(`<< /Type /Pages /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] /Count ${pages.length} >>`);
    const info=add('<< /Title <FEFF'+encodeText(report.title)+'> /Producer (Malo po malo) >>');
    const chunks=[bytes('%PDF-1.7\n')],offsets=[0];let offset=chunks[0].length;
    for(let i=1;i<objects.length;i++){offsets[i]=offset;const chunk=join([bytes(i+' 0 obj\n'),objects[i],bytes('\nendobj\n')]);chunks.push(chunk);offset+=chunk.length;}
    const xref=offset;let trailer='xref\n0 '+objects.length+'\n0000000000 65535 f \n';for(let i=1;i<objects.length;i++)trailer+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
    trailer+=`trailer\n<< /Size ${objects.length} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    chunks.push(bytes(trailer));return join(chunks);
  }
  window.SerbianPDF={create};
})();
