import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

// Runs the real inline geometry and model-switching code, without requiring a GPU.
// The browser QA is separate: this is not a fake renderer or an application fallback.
const page=fileURLToPath(new URL('../index.html',import.meta.url));
const html=fs.readFileSync(page,'utf8');
const moduleSource=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
const elements=new Map();
function element(key){
  if(!elements.has(key))elements.set(key,{
    value:key==='#firm'?'48':key==='#damp'?'34':'0',style:{},dataset:{},className:'',
    innerHTML:'Original watermelon notes',textContent:'',width:1280,height:720,
    setAttribute(k,v){this[k]=String(v)},getAttribute(k){return this[k]},
    classList:{add(){},remove(){},toggle(){}},
    querySelector(){return element(key+' span')},
    addEventListener(){},replaceChildren(){},appendChild(){},
    getBoundingClientRect(){return {left:0,top:0,width:1280,height:720}},
    hasPointerCapture(){return false},
  });
  return elements.get(key);
}
const sandbox={
  console,Math,Number,Array,Map,Set,Object,String,Date,Error,RangeError,Float32Array,
  Float64Array,Uint32Array,Uint16Array,URLSearchParams,performance,
  document:{
    querySelector:element,querySelectorAll:()=>[],
    createElement:()=>element('generated'),createTextNode:t=>({textContent:t}),
    addEventListener(){},body:{dataset:{theme:'white'}},documentElement:{dataset:{}},
  },
  window:{},location:{search:''},devicePixelRatio:1,innerWidth:1280,
  navigator:{},requestAnimationFrame:()=>1,cancelAnimationFrame(){},
  matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},
};
vm.createContext(sandbox);
const source=moduleSource.replace(/const initialModel=Number[\s\S]*?init\(\);\s*$/,
  `globalThis.__test={selectModel,ensurePigAsset,reset,activeStep,metrics,modelInfo,
    nudge,updatePigGeometry,pigState,modelLibrary,pick,
    setPaused(v){paused=v},getState(){return{selectedModel,paused,time,grab}},
    getPigGPU(){return pigGPU},
    getRestPositions(){return nodes.map(n=>n.r)},
    getPositions(){return nodes.map(n=>n.p)},
    setGrab(){startPigGrab([.24,1.65,.43]);grab.target[0]+=.32},
    releaseGrab};`);
assert.notEqual(source,moduleSource,'test bootstrap must replace init, not start a renderer');
vm.runInContext(source,sandbox,{timeout:60000});
const api=sandbox.__test;
assert.equal(api.modelLibrary.length,5);

console.time('pig mesh build');
const pig=api.ensurePigAsset();
console.timeEnd('pig mesh build');
assert.ok(pig.baseVertexCount>10000,'pig must be a modeled surface');
assert.ok(pig.fibers>16000,'plush requires real surface pile');
assert.ok(pig.shellCount>0&&pig.detailCount>pig.shellCount);
assert.ok(pig.furFirst>=pig.plushDetailCount);
assert.equal(pig.furFirst+pig.furCount,pig.indices.length);
for(const value of pig.rest)assert.ok(Number.isFinite(value));
for(const id of pig.indices)assert.ok(id<pig.rest.length/10);
let nonUnitNormals=0;
for(let i=0;i<pig.rest.length;i+=10){
  const n=Math.hypot(pig.rest[i+3],pig.rest[i+4],pig.rest[i+5]);
  if(Math.abs(n-1)>1e-4)nonUnitNormals++;
}
assert.equal(nonUnitNormals,0,'normals must stay normalized, including ears and poles');
const parts=pig.parts.map(p=>p.name);
for(const part of ['head','body','snout','eye -1','eye 1','curled tail','belly seam']){
  assert.ok(parts.includes(part),`missing real geometry: ${part}`);
}

for(const id of [0,1,2,3,4,3,0,4,2]){
  const info=api.selectModel(id);
  assert.equal(info.id,id);
  assert.equal(api.getState().selectedModel,id);
  assert.ok(info.vertices>0&&info.triangles>0);
  assert.equal(api.getState().time,0,'switch must reset the active model clock');
  assert.ok(!api.getState().grab,'switch must release the previous grab');
}
api.selectModel(3);
const snapshot=pig.vertices.slice(0,pig.baseVertexCount*10);
api.nudge();
for(let i=0;i<60;i++)api.activeStep();
api.updatePigGeometry();
assert.notDeepEqual(pig.vertices.subarray(0,100),snapshot.subarray(0,100),'nudge must deform the pig');
assert.ok(api.metrics().kinetic>0);
api.setGrab();
api.updatePigGeometry();
for(const x of pig.vertices)assert.ok(Number.isFinite(x));
api.releaseGrab();
for(let i=0;i<1200;i++)api.activeStep();
assert.ok(Math.abs(api.pigState.sway)<1e-4,'pig must settle');
api.reset();api.nudge();
for(let i=0;i<120;i++)api.activeStep();
const first=JSON.stringify(api.metrics());
api.reset();api.nudge();
for(let i=0;i<120;i++)api.activeStep();
assert.equal(JSON.stringify(api.metrics()),first,'same actions should be deterministic');
assert.equal(api.ensurePigAsset(),pig,'switches must reuse cached geometry');
assert.throws(()=>api.selectModel(5),/Unknown model/);
assert.throws(()=>api.selectModel(-1),/Unknown model/);
assert.throws(()=>api.selectModel('bad'),/Unknown model/);
api.selectModel(0);
assert.deepEqual(api.getPositions(),api.getRestPositions(),'watermelon reset remains intact');
assert.ok(html.includes("$('#modelSelect').onchange="));
assert.ok(!html.includes("document.querySelectorAll('.swatch').forEach"));
assert.equal((html.match(/type="module"/g)||[]).length,1);
console.log(`PASS: 5 models; ${pig.baseVertexCount} pig surface vertices; ${pig.fibers} fur clusters.`);
console.log('PASS: model switching, geometry cache, indices/normals, grab/release, nudge, settling, deterministic reset.');
