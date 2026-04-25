# IVR Call Flow Visualizer

Interactive web-based tool for visualizing IVR (Interactive Voice Response) call flows. Users select customer attributes (type, status, language) and the matching flow renders dynamically as a tree diagram with audio playback on each node.

## Features

- Dynamic flow rendering based on filter selections
- Interactive nodes with click-to-view details
- Audio playback per node
- Expand/collapse for large flows
- Zoom, pan, mini-map navigation
- Auto-layout via dagre (no manual positioning)
- Data-driven: all flows defined in JSON, no hardcoded logic
- RTL support for Arabic

## Tech Stack

- React 19 + TypeScript + Vite
- React Flow (diagram rendering)
- Zustand (state management)
- dagre (automatic graph layout)
- Tailwind CSS v4
- Lucide React (icons)

## Quick Start

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Editing Flows

All data lives in `src/mockData.ts`. To add or modify a flow, edit that file directly.

### Data Structure

```ts
interface IVRDataset {
  customerTypes: string[]      // e.g. ['New', 'Existing']
  customerStatuses: string[]   // e.g. ['Active', 'Suspended', 'Dunning']
  languages: string[]          // e.g. ['عربي', 'English']
  flows: IVRFlow[]
}

interface IVRFlow {
  id: string
  name: string
  filters: { type?: string; status?: string; lang?: string }
  rootNodeId: string
  nodes: IVRNode[]
}

interface IVRNode {
  id: string
  title: string
  promptText: string
  audioFile?: string
  condition?: string
  nextNodes: string[]
}
```

### Flow Matching

The app finds the first flow whose `filters` object matches the user selection. Empty filter keys mean "any value matches." See `activeFlow()` in `src/store.ts`.

### Conditional Status Visibility

The "Customer Status" dropdown only appears when `type = Existing`. New customers have no status.

## Adding Audio Files

1. Drop MP3 files into `public/audio/`
2. Reference them in the flow JSON: `audioFile: '/audio/your-file.mp3'`

A silent `dummy.mp3` is included for development.

## Project Structure

```
src/
  App.tsx                  main shell
  types.ts                 type definitions
  store.ts                 Zustand store + flow matcher
  layout.ts                dagre auto-layout
  mockData.ts              demo data (replace with real flows)
  components/
    FilterPanel.tsx        top filter bar
    FlowCanvas.tsx         React Flow canvas
    CustomNode.tsx         node card with play/collapse
    NodeDetails.tsx        right-side detail panel
    AudioPlayer.tsx        hidden audio element
```
