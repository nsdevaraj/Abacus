// Embedded Blockly editor with a Scratch-like block set and a tiny canvas stage.
// Open source: Blockly (https://github.com/google/blockly, Apache-2.0).
// No external code redirect — everything runs in-app.

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import { Play, Square, RotateCcw, Lightbulb } from 'lucide-react';

Blockly.setLocale(En as unknown as Record<string, string>);

// -------------------- Custom Scratch-like blocks --------------------
const COLORS = {
  motion: '#4C97FF',
  looks: '#9966FF',
  events: '#FFBF00',
  control: '#FFAB19',
  sensing: '#5CB1D6',
  operators: '#59C059',
  variables: '#FF8C1A',
  pen: '#0FBD8C',
};

let blocksRegistered = false;

function registerBlocks() {
  if (blocksRegistered) return;
  blocksRegistered = true;

  const defs: Array<{ type: string; init: (this: Blockly.Block) => void; code: (b: Blockly.Block) => string }> = [
    // Events (hat blocks)
    {
      type: 'event_whenflagclicked',
      init() {
        this.appendDummyInput().appendField('when ⚑ clicked');
        this.setNextStatement(true, null);
        this.setColour(COLORS.events);
      },
      code: () => '',
    },
    {
      type: 'event_whenkeypressed',
      init() {
        this.appendDummyInput()
          .appendField('when')
          .appendField(new Blockly.FieldDropdown([
            ['space','space'],['up arrow','ArrowUp'],['down arrow','ArrowDown'],
            ['left arrow','ArrowLeft'],['right arrow','ArrowRight'],
            ['a','a'],['s','s'],['d','d'],['w','w'],
          ]), 'KEY')
          .appendField('key pressed');
        this.setNextStatement(true, null);
        this.setColour(COLORS.events);
      },
      code: () => '',
    },

    // Motion
    {
      type: 'motion_movesteps',
      init() {
        this.appendDummyInput()
          .appendField('move')
          .appendField(new Blockly.FieldNumber(10), 'STEPS')
          .appendField('steps');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.move(${b.getFieldValue('STEPS')});\n`,
    },
    {
      type: 'motion_turnright',
      init() {
        this.appendDummyInput()
          .appendField('turn ↻')
          .appendField(new Blockly.FieldNumber(15), 'DEG')
          .appendField('degrees');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.turn(${b.getFieldValue('DEG')});\n`,
    },
    {
      type: 'motion_turnleft',
      init() {
        this.appendDummyInput()
          .appendField('turn ↺')
          .appendField(new Blockly.FieldNumber(15), 'DEG')
          .appendField('degrees');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.turn(-${b.getFieldValue('DEG')});\n`,
    },
    {
      type: 'motion_gotoxy',
      init() {
        this.appendDummyInput()
          .appendField('go to x:')
          .appendField(new Blockly.FieldNumber(0), 'X')
          .appendField('y:')
          .appendField(new Blockly.FieldNumber(0), 'Y');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.goTo(${b.getFieldValue('X')}, ${b.getFieldValue('Y')});\n`,
    },
    {
      type: 'motion_glideto',
      init() {
        this.appendDummyInput()
          .appendField('glide')
          .appendField(new Blockly.FieldNumber(1, 0, 60, 0.1), 'SECS')
          .appendField('secs to x:')
          .appendField(new Blockly.FieldNumber(0), 'X')
          .appendField('y:')
          .appendField(new Blockly.FieldNumber(0), 'Y');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.glide(${b.getFieldValue('SECS')}, ${b.getFieldValue('X')}, ${b.getFieldValue('Y')});\n`,
    },
    {
      type: 'motion_changex',
      init() {
        this.appendDummyInput()
          .appendField('change x by')
          .appendField(new Blockly.FieldNumber(10), 'DX');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.changeX(${b.getFieldValue('DX')});\n`,
    },
    {
      type: 'motion_changey',
      init() {
        this.appendDummyInput()
          .appendField('change y by')
          .appendField(new Blockly.FieldNumber(10), 'DY');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `await stage.changeY(${b.getFieldValue('DY')});\n`,
    },
    {
      type: 'motion_pointindirection',
      init() {
        this.appendDummyInput()
          .appendField('point in direction')
          .appendField(new Blockly.FieldNumber(90), 'DIR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: (b) => `stage.setDirection(${b.getFieldValue('DIR')});\n`,
    },
    {
      type: 'motion_ifonedgebounce',
      init() {
        this.appendDummyInput().appendField('if on edge, bounce');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.motion);
      },
      code: () => `stage.ifOnEdgeBounce();\n`,
    },

    // Looks
    {
      type: 'looks_say',
      init() {
        this.appendDummyInput()
          .appendField('say')
          .appendField(new Blockly.FieldTextInput('Hello!'), 'TEXT')
          .appendField('for')
          .appendField(new Blockly.FieldNumber(2, 0, 60, 0.1), 'SECS')
          .appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.looks);
      },
      code: (b) =>
        `await stage.say(${JSON.stringify(b.getFieldValue('TEXT'))}, ${b.getFieldValue('SECS')});\n`,
    },
    {
      type: 'looks_changesizeby',
      init() {
        this.appendDummyInput()
          .appendField('change size by')
          .appendField(new Blockly.FieldNumber(10), 'DS');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.looks);
      },
      code: (b) => `stage.changeSize(${b.getFieldValue('DS')});\n`,
    },
    {
      type: 'looks_setsizeto',
      init() {
        this.appendDummyInput()
          .appendField('set size to')
          .appendField(new Blockly.FieldNumber(100), 'SIZE')
          .appendField('%');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.looks);
      },
      code: (b) => `stage.setSize(${b.getFieldValue('SIZE')});\n`,
    },
    {
      type: 'looks_changecolorby',
      init() {
        this.appendDummyInput()
          .appendField('change color effect by')
          .appendField(new Blockly.FieldNumber(25), 'DC');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.looks);
      },
      code: (b) => `stage.changeColor(${b.getFieldValue('DC')});\n`,
    },
    {
      type: 'looks_show',
      init() {
        this.appendDummyInput().appendField('show');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.looks);
      },
      code: () => `stage.show();\n`,
    },
    {
      type: 'looks_hide',
      init() {
        this.appendDummyInput().appendField('hide');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.looks);
      },
      code: () => `stage.hide();\n`,
    },

    // Control
    {
      type: 'control_wait',
      init() {
        this.appendDummyInput()
          .appendField('wait')
          .appendField(new Blockly.FieldNumber(1, 0, 60, 0.01), 'SECS')
          .appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
      },
      code: (b) => `await stage.wait(${b.getFieldValue('SECS')});\n`,
    },
    {
      type: 'control_repeat',
      init() {
        this.appendDummyInput()
          .appendField('repeat')
          .appendField(new Blockly.FieldNumber(10, 0), 'TIMES');
        this.appendStatementInput('DO').appendField('');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
      },
      code: (b) => {
        const branch = javascriptGenerator.statementToCode(b, 'DO');
        return `for (let __i = 0; __i < ${b.getFieldValue('TIMES')}; __i++) {\n${branch}  await stage.tick();\n}\n`;
      },
    },
    {
      type: 'control_forever',
      init() {
        this.appendDummyInput().appendField('forever');
        this.appendStatementInput('DO').appendField('');
        this.setPreviousStatement(true, null);
        this.setColour(COLORS.control);
      },
      code: (b) => {
        const branch = javascriptGenerator.statementToCode(b, 'DO');
        return `while (!stage.stopped) {\n${branch}  await stage.tick();\n}\n`;
      },
    },
    {
      type: 'control_stop_all',
      init() {
        this.appendDummyInput().appendField('stop all');
        this.setPreviousStatement(true, null);
        this.setColour(COLORS.control);
      },
      code: () => `stage.stopAll(); return;\n`,
    },

    // Pen
    {
      type: 'pen_down',
      init() {
        this.appendDummyInput().appendField('pen down');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.pen);
      },
      code: () => `stage.penDown();\n`,
    },
    {
      type: 'pen_up',
      init() {
        this.appendDummyInput().appendField('pen up');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.pen);
      },
      code: () => `stage.penUp();\n`,
    },
    {
      type: 'pen_clear',
      init() {
        this.appendDummyInput().appendField('erase all');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.pen);
      },
      code: () => `stage.penClear();\n`,
    },
  ];

  for (const d of defs) {
    Blockly.Blocks[d.type] = { init: d.init };
    (javascriptGenerator as unknown as {
      forBlock: Record<string, (b: Blockly.Block) => string | [string, number]>;
    }).forBlock[d.type] = d.code as (b: Blockly.Block) => string | [string, number];
  }
}

// -------------------- Stage runtime --------------------
type StageHandle = ReturnType<typeof createStage>;

function createStage(canvas: HTMLCanvasElement, bubbleEl: HTMLDivElement, spriteEl: HTMLDivElement) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext('2d')!;
  let stopped = false;
  let pos = { x: 0, y: 0 };
  let dir = 90; // 90 = right
  let size = 100;
  let colorEffect = 0;
  let visible = true;
  let pen = { down: false, hue: 0 };

  const clearCanvas = () => ctx.clearRect(0, 0, W, H);

  const render = () => {
    const cx = W / 2 + pos.x;
    const cy = H / 2 - pos.y;
    spriteEl.style.transform = `translate(${cx - 30}px, ${cy - 30}px) rotate(${dir - 90}deg) scale(${size / 100})`;
    spriteEl.style.opacity = visible ? '1' : '0';
    spriteEl.style.filter = `hue-rotate(${colorEffect * 3.6}deg)`;
  };

  const drawLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    ctx.strokeStyle = `hsl(${pen.hue}, 90%, 55%)`;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(W / 2 + from.x, H / 2 - from.y);
    ctx.lineTo(W / 2 + to.x, H / 2 - to.y);
    ctx.stroke();
  };

  const moveTo = (nx: number, ny: number) => {
    if (pen.down) drawLine(pos, { x: nx, y: ny });
    pos = { x: nx, y: ny };
    render();
  };

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      const t = setTimeout(() => resolve(), ms);
      const id = setInterval(() => {
        if (stopped) {
          clearTimeout(t);
          clearInterval(id);
          resolve();
        }
      }, 30);
      // also clear interval when timeout fires
      setTimeout(() => clearInterval(id), ms + 50);
    });

  const api = {
    get stopped() { return stopped; },
    stopAll() { stopped = true; },
    async tick() { if (stopped) throw new Error('__stopped__'); await sleep(16); },
    async wait(secs: number) { await sleep(secs * 1000); },
    async move(steps: number) {
      const rad = ((dir - 90) * Math.PI) / 180;
      const nx = pos.x + steps * Math.cos(rad);
      const ny = pos.y - steps * Math.sin(rad);
      moveTo(nx, ny);
      await sleep(16);
    },
    async turn(degrees: number) {
      dir = (dir + degrees) % 360;
      render();
      await sleep(16);
    },
    async goTo(x: number, y: number) {
      moveTo(x, y);
      await sleep(16);
    },
    async glide(secs: number, x: number, y: number) {
      const steps = Math.max(1, Math.floor(secs * 30));
      const sx = pos.x, sy = pos.y;
      for (let i = 1; i <= steps; i++) {
        if (stopped) return;
        const t = i / steps;
        moveTo(sx + (x - sx) * t, sy + (y - sy) * t);
        await sleep((secs * 1000) / steps);
      }
    },
    async changeX(dx: number) { moveTo(pos.x + dx, pos.y); await sleep(16); },
    async changeY(dy: number) { moveTo(pos.x, pos.y + dy); await sleep(16); },
    setDirection(d: number) { dir = d; render(); },
    ifOnEdgeBounce() {
      if (pos.x > W / 2 - 20) { pos.x = W / 2 - 20; dir = 180 - dir; }
      if (pos.x < -W / 2 + 20) { pos.x = -W / 2 + 20; dir = 180 - dir; }
      if (pos.y > H / 2 - 20) { pos.y = H / 2 - 20; dir = -dir; }
      if (pos.y < -H / 2 + 20) { pos.y = -H / 2 + 20; dir = -dir; }
      render();
    },
    async say(text: string, secs: number) {
      bubbleEl.textContent = text;
      bubbleEl.style.opacity = '1';
      await sleep(secs * 1000);
      bubbleEl.style.opacity = '0';
    },
    changeSize(ds: number) { size = Math.max(10, size + ds); render(); },
    setSize(s: number) { size = Math.max(10, s); render(); },
    changeColor(dc: number) { colorEffect = (colorEffect + dc) % 100; render(); },
    show() { visible = true; render(); },
    hide() { visible = false; render(); },
    penDown() { pen.down = true; },
    penUp() { pen.down = false; },
    penClear() { clearCanvas(); },
    setHue(h: number) { pen.hue = h; },
    reset() {
      stopped = false;
      pos = { x: 0, y: 0 };
      dir = 90; size = 100; colorEffect = 0; visible = true;
      pen = { down: false, hue: 0 };
      clearCanvas();
      bubbleEl.style.opacity = '0';
      render();
    },
    requestStop() { stopped = true; },
  };

  api.reset();
  return api;
}

// -------------------- Toolbox builder --------------------
const TOOLBOX_CATEGORIES: Array<{ name: string; colour: string; blocks: string[] }> = [
  { name: 'Events', colour: COLORS.events, blocks: ['event_whenflagclicked', 'event_whenkeypressed'] },
  { name: 'Motion', colour: COLORS.motion, blocks: [
      'motion_movesteps','motion_turnright','motion_turnleft','motion_gotoxy','motion_glideto',
      'motion_changex','motion_changey','motion_pointindirection','motion_ifonedgebounce'
    ] },
  { name: 'Looks', colour: COLORS.looks, blocks: [
      'looks_say','looks_changesizeby','looks_setsizeto','looks_changecolorby','looks_show','looks_hide'
    ] },
  { name: 'Control', colour: COLORS.control, blocks: ['control_wait','control_repeat','control_forever','control_stop_all'] },
  { name: 'Pen', colour: COLORS.pen, blocks: ['pen_down','pen_up','pen_clear'] },
];

function buildToolbox(): Blockly.utils.toolbox.ToolboxDefinition {
  return {
    kind: 'categoryToolbox',
    contents: TOOLBOX_CATEGORIES.map((cat) => ({
      kind: 'category',
      name: cat.name,
      colour: cat.colour,
      contents: cat.blocks.map((b) => ({ kind: 'block', type: b })),
    })),
  };
}

// -------------------- Suggested-block matcher --------------------
// Map fuzzy story block hints to known block types so we can pre-fill the workspace.
function suggestionToType(s: string): string | null {
  const x = s.toLowerCase();
  if (x.includes('green flag') || x.includes('⚑ clicked')) return 'event_whenflagclicked';
  if (x.includes('key pressed')) return 'event_whenkeypressed';
  if (x.includes('move') && x.includes('steps')) return 'motion_movesteps';
  if (x.includes('turn ↻') || x.includes('turn cw') || (x.includes('turn') && x.includes('right'))) return 'motion_turnright';
  if (x.includes('turn ↺') || x.includes('turn ccw') || (x.includes('turn') && x.includes('left'))) return 'motion_turnleft';
  if (x.startsWith('go to x:')) return 'motion_gotoxy';
  if (x.startsWith('glide')) return 'motion_glideto';
  if (x.includes('change x')) return 'motion_changex';
  if (x.includes('change y')) return 'motion_changey';
  if (x.includes('point in direction')) return 'motion_pointindirection';
  if (x.includes('if on edge')) return 'motion_ifonedgebounce';
  if (x.startsWith('say')) return 'looks_say';
  if (x.includes('change size')) return 'looks_changesizeby';
  if (x.includes('set size')) return 'looks_setsizeto';
  if (x.includes('change color')) return 'looks_changecolorby';
  if (x === 'show') return 'looks_show';
  if (x === 'hide') return 'looks_hide';
  if (x.startsWith('wait')) return 'control_wait';
  if (x.startsWith('repeat')) return 'control_repeat';
  if (x.startsWith('forever')) return 'control_forever';
  if (x.includes('stop all')) return 'control_stop_all';
  if (x.includes('pen down')) return 'pen_down';
  if (x.includes('pen up')) return 'pen_up';
  return null;
}

// -------------------- React component --------------------
interface BlocklyEditorProps {
  suggestedBlocks?: string[];
  storyKey?: string;
}

const BlocklyEditor: React.FC<BlocklyEditorProps> = ({ suggestedBlocks = [], storyKey }) => {
  const blocklyDivRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<StageHandle | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Blockly workspace
  useEffect(() => {
    registerBlocks();
    if (!blocklyDivRef.current) return;

    const workspace = Blockly.inject(blocklyDivRef.current, {
      toolbox: buildToolbox(),
      media: '/blockly-media/',
      grid: { spacing: 24, length: 2, colour: '#e2e8f0', snap: true },
      trashcan: true,
      zoom: { controls: true, wheel: false, startScale: 0.9, minScale: 0.5, maxScale: 1.5 },
      renderer: 'zelos',
      theme: Blockly.Theme.defineTheme('scratchLike', {
        name: 'scratchLike',
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: '#f8fafc',
          toolboxBackgroundColour: '#ffffff',
          flyoutBackgroundColour: '#f1f5f9',
        },
      }),
    });
    workspaceRef.current = workspace;

    // Init stage
    if (canvasRef.current && bubbleRef.current && spriteRef.current) {
      stageRef.current = createStage(canvasRef.current, bubbleRef.current, spriteRef.current);
    }

    const onResize = () => Blockly.svgResize(workspace);
    window.addEventListener('resize', onResize);
    // initial resize after layout
    setTimeout(onResize, 50);

    return () => {
      window.removeEventListener('resize', onResize);
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, []);

  // Pre-fill suggested blocks when story changes
  useEffect(() => {
    const ws = workspaceRef.current;
    if (!ws) return;
    ws.clear();
    if (!suggestedBlocks.length) return;

    let y = 20;
    let prev: Blockly.Block | null = null;
    let chainable = false;
    for (const hint of suggestedBlocks) {
      const type = suggestionToType(hint);
      if (!type) continue;
      const block = ws.newBlock(type);
      (block as Blockly.BlockSvg).initSvg();
      (block as Blockly.BlockSvg).render();
      const isHat = type.startsWith('event_');
      if (prev && chainable && !isHat) {
        // connect to previous
        const prevNext = prev.nextConnection;
        const thisPrev = block.previousConnection;
        if (prevNext && thisPrev) {
          prevNext.connect(thisPrev);
        } else {
          (block as Blockly.BlockSvg).moveBy(40, y);
          y += 60;
        }
      } else {
        (block as Blockly.BlockSvg).moveBy(40, y);
        y += 60;
      }
      prev = block;
      chainable = !isHat || true;
    }
    // Scroll to top-left
    ws.scrollCenter();
  }, [storyKey, suggestedBlocks.join('|')]);

  const handleRun = useCallback(async () => {
    const ws = workspaceRef.current;
    const stage = stageRef.current;
    if (!ws || !stage) return;
    setError(null);
    stage.reset();
    setRunning(true);

    // Collect code from each "when flag clicked" hat; if none, run every top stack.
    const tops = ws.getTopBlocks(true);
    const scripts: string[] = [];
    for (const top of tops) {
      const code = javascriptGenerator.blockToCode(top) as string;
      // Strip the hat header (which generates ''), keep its successors
      if (top.type === 'event_whenflagclicked' || top.type === 'event_whenkeypressed') {
        scripts.push(code);
      } else {
        scripts.push(code);
      }
    }

    const body = scripts.join('\n');
    // eslint-disable-next-line no-new-func
    const fn = new Function('stage', `return (async () => {\n${body}\n})();`);
    try {
      await fn(stage);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg !== '__stopped__') setError(msg);
    } finally {
      setRunning(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    stageRef.current?.requestStop();
  }, []);

  const handleReset = useCallback(() => {
    stageRef.current?.requestStop();
    setTimeout(() => stageRef.current?.reset(), 50);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl border-4 border-sky-100 dark:border-slate-700 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-sky-50 dark:bg-slate-900 border-b border-sky-100 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sky-800 dark:text-sky-100 font-black">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span className="text-sm md:text-base">Code Workspace</span>
          <span className="hidden md:inline text-xs font-medium text-sky-500 dark:text-sky-300 ml-2">
            Drag blocks · Press ▶ to run
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-black px-4 py-2 rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4" /> Run
          </button>
          <button
            onClick={handleStop}
            disabled={!running}
            className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-black px-4 py-2 rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Square className="w-4 h-4" /> Stop
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black px-3 py-2 rounded-xl text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
            title="Reset stage"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0">
        {/* Blockly workspace */}
        <div ref={blocklyDivRef} className="w-full h-[480px] lg:h-[560px] bg-slate-50" />

        {/* Stage panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-sky-100 dark:border-slate-700 p-3 bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 flex flex-col gap-2">
          <div className="text-xs font-black text-sky-700 dark:text-sky-200 uppercase tracking-wider">Stage</div>
          <div className="relative w-full aspect-[4/3] bg-white dark:bg-slate-700 rounded-2xl border-2 border-sky-200 dark:border-slate-600 overflow-hidden shadow-inner">
            <canvas ref={canvasRef} width={480} height={360} className="absolute inset-0 w-full h-full" />
            <div
              ref={spriteRef}
              className="absolute top-0 left-0 w-[60px] h-[60px] flex items-center justify-center text-4xl select-none pointer-events-none transition-transform"
              style={{ transformOrigin: '50% 50%' }}
            >
              🐱
            </div>
            <div
              ref={bubbleRef}
              className="absolute top-2 left-2 max-w-[80%] bg-white text-slate-800 text-xs md:text-sm font-bold px-3 py-1.5 rounded-2xl rounded-bl-sm shadow-md opacity-0 transition-opacity pointer-events-none border border-slate-200"
            />
          </div>
          {error && (
            <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg font-mono break-all">
              {error}
            </div>
          )}
          <p className="text-[11px] text-sky-600/80 dark:text-sky-300/70 leading-snug">
            Powered by Blockly (Apache-2.0). Sprite & stage run locally — no internet needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlocklyEditor;
