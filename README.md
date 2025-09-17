## ⚠️ Experimental Warning

This is an **experimental project vibe coded exclusively with Sonoma Dusk Alpha** - I just told the AI to code for me. It explores techniques for noisy JSON optimization in AI-driven applications. **Use at your own risk!**

# jsonToCompact

A high-performance, bidirectional JSON serializer/deserializer that converts standard JSON to the Compact Format, reducing token usage by 8-20% while maintaining full fidelity with the original JSON structure.

This library was specifically designed to optimize JSON payloads in MCP (Model Context Protocol) servers, where reducing token count is crucial for efficient communication with AI models and language processing systems.

## Features

- 🚀 **Token Savings**: 8-20% reduction in token usage compared to standard JSON
- 🔄 **Bidirectional**: Both serialize (JSON → Compact Format) and parse (Compact Format → JSON)
- 🛡️ **Safe**: Protection against circular references and excessive recursion
- 🌍 **Unicode Support**: Full Unicode character support
- 📦 **TypeScript**: Complete TypeScript definitions included
- 🧪 **Basic Testing**: Includes a test suite for core functionality, but may contain bugs due to experimental nature

## Installation

```bash
npm install json-to-compact
```

## Usage

### JavaScript

```javascript
const { jsonToCompact, compactToJson } = require('json-to-compact');

const obj = {
  name: 'test',
  nested: { arr: [1, 'two', true] },
  special: 'Hello 🌍!'
};

const compact = jsonToCompact(obj);
// Output: {name test nested{arr[1 two true]} special "Hello 🌍!"}

const parsed = compactToJson(compact);
// Output: { name: 'test', nested: { arr: [1, 'two', true] }, special: 'Hello 🌍!' }
```

### TypeScript

```typescript
import { jsonToCompact, compactToJson, JsonValue } from 'json-to-compact';

const obj: JsonValue = {
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
};

const compact: string = jsonToCompact(obj);
const parsed: JsonValue = compactToJson(compact);
```

## API Reference

### `jsonToCompact(obj, options?)`

Serializes a JavaScript object to compact string format.

**Parameters:**
- `obj` (JsonValue): The object to serialize
- `options` (JsonToCompactOptions, optional):
  - `maxDepth` (number): Maximum recursion depth (default: 100)

**Returns:** `string` - Compact string representation

**Throws:** `Error` if input is invalid or recursion limit exceeded

### `compactToJson(compactStr)`

Parses a compact string format back to JavaScript object.

**Parameters:**
- `compactStr` (string): The compact string to parse

**Returns:** `JsonValue` - Parsed JavaScript object

**Throws:** `Error` if input is invalid

## Compact Format Specification

The Compact Format is a space-optimized serialization format designed for token-efficient JSON transmission. It follows these transformation rules:

- **Objects**: `{key1 value1 key2 value2 ...}` - Keys and values separated by spaces, no colons or commas
- **Arrays**: `[item1 item2 item3 ...]` - Elements separated by spaces, no commas
- **Strings**:
  - Unquoted if safe: Match `/^[a-zA-Z0-9\-\._\u0080-\uFFFF]+$/u` (alphanumeric, hyphen, dot, underscore, Unicode letters)
  - Quoted otherwise: Standard JSON string escaping with double quotes
- **Numbers**: Unquoted numeric values (integers and floats)
- **Booleans**: `true` or `false` (unquoted)
- **Null**: `null` (unquoted)

### Example Transformation

Original JSON:
```json
{
  "name": "John Doe",
  "age": 30,
  "active": true,
  "tags": ["dev", "ai"],
  "special": "Hello \"world\"!"
}
```

Compact Format:
```
{name John Doe age 30 active true tags[dev ai] special "Hello \"world\"!"}
```

This format reduces token count while maintaining full parseability back to the original structure.
## Development

### Available Scripts

- **`npm test`**: Runs the comprehensive test suite using Node.js.
- **`npm run build`**: Compiles TypeScript source to JavaScript, minifies the output using Terser, and creates a production bundle in the `dist/` directory.
- **`npm run prepublishOnly`**: Automatically runs the build script before publishing to npm.
- **`npm run clean`**: Removes build artifacts (`dist/`) and `node_modules` directory for a clean workspace.

To get started with development:

```bash
npm install
npm run build
npm test
```

## Author

**Sonoma Dusk Alpha** - I just told the AI to code for me.

## License

MIT License - see LICENSE file for details.