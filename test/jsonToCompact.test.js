/**
 * jsonToCompact - Comprehensive Test Suite
 *
 * This file contains all tests for the jsonToCompact library.
 * Run with: node jsonToCompact.test.js
 */

// Import the functions
const { jsonToCompact, compactToJson } = require('../dist/jsonToCompact.js');

// Simple assert function for testing
function assertEquals(expected, actual, message) {
  if (actual !== expected) {
    console.error(`❌ ${message}: Expected "${expected}", got "${actual}"`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
}

// Token length comparison
function compareTokens(original, compact, message) {
  const originalLen = JSON.stringify(original).length;
  const compactLen = compact.length;
  const savings = ((originalLen - compactLen) / originalLen * 100).toFixed(1);
  console.log(`📊 ${message}: Original ${originalLen} chars → Compact ${compactLen} chars (${savings}% savings)`);
}

// Deep comparison for objects
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    if (keysA.length !== keysB.length) return false;
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return false;
}

console.log('Running jsonToCompact Comprehensive Test Suite...\n');

let passCount = 0;
let totalTests = 0;

// Test 1: Basic object
totalTests++;
console.log('Test 1: Basic object');
const input1 = { name: 'test', version: '1.0' };
const expected1 = '{name test version 1.0}';
const result1 = jsonToCompact(input1);
assertEquals(expected1, result1, 'Basic object');
passCount++;
compareTokens(input1, result1, 'Basic object token savings');

// Test 2: Object with array
totalTests++;
console.log('Test 2: Object with array');
const input2 = { trees: { deciduous: ['beech', 'ash'] } };
const expected2 = '{trees{deciduous[beech ash]}}';
const result2 = jsonToCompact(input2);
assertEquals(expected2, result2, 'Object with array');
passCount++;
compareTokens(input2, result2, 'Object with array token savings');

// Test 3: Keys with spaces
totalTests++;
console.log('Test 3: Keys with spaces');
const input3 = { 'deciduous trees': ['beech', 'oak'] };
const expected3 = '{"deciduous trees"[beech oak]}';
const result3 = jsonToCompact(input3);
assertEquals(expected3, result3, 'Keys with spaces');
passCount++;
compareTokens(input3, result3, 'Keys with spaces token savings');

// Test 4: Main trees example
totalTests++;
console.log('Test 4: Main trees example');
const input4 = {
  trees: {
    'deciduous trees': ['beech', 'ash', 'willow', 'chestnut', 'sycamore', 'oak'],
    'conifer trees': ['pine', 'fir', 'cedar', 'larch', 'spruce']
  }
};
const expected4 = '{trees{"deciduous trees"[beech ash willow chestnut sycamore oak] "conifer trees"[pine fir cedar larch spruce]}}';
const result4 = jsonToCompact(input4);
assertEquals(expected4, result4, 'Main trees example');
passCount++;
compareTokens(input4, result4, 'Main trees example token savings');

// Test 5: Invalid input
totalTests++;
console.log('Test 5: Invalid input');
try {
  jsonToCompact('not an object');
  console.error('❌ Should have thrown error for string input');
  process.exit(1);
} catch (e) {
  console.log('✅ String input throws error');
  passCount++;
}

// Test 6: Nested arrays
totalTests++;
console.log('Test 6: Nested arrays');
const input6 = { nested: [['a', 'b'], ['c', 'd']] };
const expected6 = '{nested[[a b] [c d]]}';
const result6 = jsonToCompact(input6);
assertEquals(expected6, result6, 'Nested arrays');
passCount++;
compareTokens(input6, result6, 'Nested arrays token savings');

// Test 7: Objects in arrays
totalTests++;
console.log('Test 7: Objects in arrays');
const input7 = { items: [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }] };
const expected7 = '{items[{id 1 name item1} {id 2 name item2}]}';
const result7 = jsonToCompact(input7);
assertEquals(expected7, result7, 'Objects in arrays');
passCount++;
compareTokens(input7, result7, 'Objects in arrays token savings');

// Test 8: Special characters in keys
totalTests++;
console.log('Test 8: Special characters in keys');
const input8 = { 'key:with:colon': 'value', 'nested-obj': { 'sub:key': 'sub-value' } };
const expected8 = '{"key:with:colon" value nested-obj{"sub:key" sub-value}}';
const result8 = jsonToCompact(input8);
assertEquals(expected8, result8, 'Special characters in keys');
passCount++;
compareTokens(input8, result8, 'Special characters in keys token savings');

// Test 9: Special characters in values
totalTests++;
console.log('Test 9: Special characters in values');
const input9 = { url: 'file://test/path', json: '{"key": "value"}' };
const expected9 = '{url "file://test/path" json "{"key": "value"}"}';
const result9 = jsonToCompact(input9);
assertEquals(expected9, result9, 'Special characters in values');
passCount++;
compareTokens(input9, result9, 'Special characters in values token savings');

// Test 10: Numbers and booleans
totalTests++;
console.log('Test 10: Numbers and booleans');
const input10 = { num: 42, bool: true, arr: [1, false, 3.14] };
const expected10 = '{num 42 bool true arr[1 false 3.14]}';
const result10 = jsonToCompact(input10);
assertEquals(expected10, result10, 'Numbers and booleans');
passCount++;
compareTokens(input10, result10, 'Numbers and booleans token savings');

// Test 11: Empty structures
totalTests++;
console.log('Test 11: Empty structures');
const input11 = { emptyObj: {}, emptyArr: [], mixed: { empty: {} } };
const expected11 = '{emptyObj{} emptyArr[] mixed{empty{}}}';
const result11 = jsonToCompact(input11);
assertEquals(expected11, result11, 'Empty structures');
passCount++;
compareTokens(input11, result11, 'Empty structures token savings');

// Test 12: Null values
totalTests++;
console.log('Test 12: Null values');
const input12 = { nullVal: null, obj: { nullKey: null } };
const expected12 = '{nullVal null obj{nullKey null}}';
const result12 = jsonToCompact(input12);
assertEquals(expected12, result12, 'Null values');
passCount++;
compareTokens(input12, result12, 'Null values token savings');

// Test 13: Deep nesting
totalTests++;
console.log('Test 13: Deep nesting');
const input13 = { level1: { level2: { level3: { level4: 'deep' } } } };
const expected13 = '{level1{level2{level3{level4 deep}}}}';
const result13 = jsonToCompact(input13);
assertEquals(expected13, result13, 'Deep nesting');
passCount++;
compareTokens(input13, result13, 'Deep nesting token savings');

// Test 14: Mixed types
totalTests++;
console.log('Test 14: Mixed types');
const input14 = { mixed: [1, 'string', true, null, { obj: 'value' }, ['nested']] };
const expected14 = '{mixed[1 string true null {obj value} [nested]]}';
const result14 = jsonToCompact(input14);
assertEquals(expected14, result14, 'Mixed types');
passCount++;
compareTokens(input14, result14, 'Mixed types token savings');

// Test 15: Arrays with objects
totalTests++;
console.log('Test 15: Arrays with objects');
const input15 = { data: [{ id: 1 }, { id: 2, nested: { deep: 'value' } }] };
const expected15 = '{data[{id 1} {id 2 nested{deep value}}]}';
const result15 = jsonToCompact(input15);
assertEquals(expected15, result15, 'Arrays with objects');
passCount++;
compareTokens(input15, result15, 'Arrays with objects token savings');

// Test 16: Objects with arrays
totalTests++;
console.log('Test 16: Objects with arrays');
const input16 = { config: { ports: [80, 443], hosts: ['localhost', 'example.com'] } };
const expected16 = '{config{ports[80 443] hosts[localhost example.com]}}';
const result16 = jsonToCompact(input16);
assertEquals(expected16, result16, 'Objects with arrays');
passCount++;
compareTokens(input16, result16, 'Objects with arrays token savings');

// Test 17: Unicode characters
totalTests++;
console.log('Test 17: Unicode characters');
const input17 = { greeting: 'Hällö Wörld 🎉', international: 'Bonjour Monde' };
const expected17 = '{greeting "Hällö Wörld 🎉" international "Bonjour Monde"}';
const result17 = jsonToCompact(input17);
assertEquals(expected17, result17, 'Unicode characters');
passCount++;
compareTokens(input17, result17, 'Unicode token savings');

// Test 18: Special numbers
totalTests++;
console.log('Test 18: Special numbers');
const input18 = { nan: NaN, inf: Infinity, negInf: -Infinity };
const expected18 = '{nan NaN inf Infinity negInf -Infinity}';
const result18 = jsonToCompact(input18);
assertEquals(expected18, result18, 'Special numbers');
passCount++;
compareTokens(input18, result18, 'Special numbers token savings');

// Test 19: Escaped strings
totalTests++;
console.log('Test 19: Escaped strings');
const input19 = { quote: 'He said "hello"', escape: 'line\nbreak', tab: '\t', json: '{"key": "value"}' };
const expected19 = '{quote "He said \\"hello\\"" escape "line\\nbreak" tab "\\t" json "{"key": "value"}"}';
const result19 = jsonToCompact(input19);
assertEquals(expected19, result19, 'Escaped strings');
passCount++;
compareTokens(input19, result19, 'Escaped strings token savings');

// Test 20: Numeric keys
totalTests++;
console.log('Test 20: Numeric keys');
const input20 = { '1': 'first', '2.5': 'decimal key', 3: 'number key' };
const expected20 = '{1 first 3 "number key" 2.5 "decimal key"}';
const result20 = jsonToCompact(input20);
assertEquals(expected20, result20, 'Numeric keys');
passCount++;
compareTokens(input20, result20, 'Numeric keys token savings');

// Test 21: Strings with spaces in values
totalTests++;
console.log('Test 21: Strings with spaces in values');
const input21 = { message: 'hello world', status: 'ok', description: 'This is a test' };
const expected21 = '{message "hello world" status ok description "This is a test"}';
const result21 = jsonToCompact(input21);
assertEquals(expected21, result21, 'Strings with spaces in values');
passCount++;
compareTokens(input21, result21, 'Strings with spaces in values token savings');

// Test 22: Complex nested structure
totalTests++;
console.log('Test 22: Complex nested structure');
const input22 = {
  users: [
    { id: 1, name: 'John Doe', roles: ['admin', 'user'] },
    { id: 2, name: 'Jane Smith', roles: ['user'] }
  ],
  settings: { theme: 'dark', notifications: true }
};
const expected22 = '{users[{id 1 name "John Doe" roles[admin user]} {id 2 name "Jane Smith" roles[user]}] settings{theme dark notifications true}}';
const result22 = jsonToCompact(input22);
assertEquals(expected22, result22, 'Complex nested structure');
passCount++;
compareTokens(input22, result22, 'Complex nested structure token savings');

// Test 23: Empty objects and arrays
totalTests++;
console.log('Test 23: Empty objects and arrays');
const input23 = { emptyObj: {}, emptyArr: [], mixed: { nested: {} } };
const expected23 = '{emptyObj{} emptyArr[] mixed{nested{}}}';
const result23 = jsonToCompact(input23);
assertEquals(expected23, result23, 'Empty objects and arrays');
passCount++;
compareTokens(input23, result23, 'Empty objects and arrays token savings');

// Test 24: Special characters in strings
totalTests++;
console.log('Test 24: Special characters in strings');
const input24 = { path: '/usr/local/bin', url: 'https://example.com', regex: '/^test$/' };
const expected24 = '{path "/usr/local/bin" url "https://example.com" regex "/^test$/"}';
const result24 = jsonToCompact(input24);
assertEquals(expected24, result24, 'Special characters in strings');
passCount++;
compareTokens(input24, result24, 'Special characters in strings token savings');

// Test 25: Mixed data types
totalTests++;
console.log('Test 25: Mixed data types');
const input25 = { num: 42, str: 'text', bool: false, nullVal: null, arr: [1, 'two', true] };
const expected25 = '{num 42 str text bool false nullVal null arr[1 two true]}';
const result25 = jsonToCompact(input25);
assertEquals(expected25, result25, 'Mixed data types');
passCount++;
compareTokens(input25, result25, 'Mixed data types token savings');

// Test 26: Large structure with many tokens
totalTests++;
console.log('Test 26: Large structure with many tokens');
const input26 = {
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', roles: ['admin', 'editor'], active: true, lastLogin: '2023-10-01' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', roles: ['user'], active: false, lastLogin: '2023-09-15' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', roles: ['moderator', 'user'], active: true, lastLogin: '2023-10-05' }
  ],
  settings: {
    theme: 'dark',
    notifications: { email: true, push: false, sms: true },
    preferences: { language: 'en', timezone: 'UTC', currency: 'USD' }
  },
  metadata: {
    version: '1.2.3',
    build: 456,
    features: ['feature1', 'feature2', 'feature3', 'feature4'],
    config: { maxUsers: 1000, timeout: 30000, retries: 3 }
  }
};
const expected26 = '{users[{id 1 name "Alice Johnson" email "alice@example.com" roles[admin editor] active true lastLogin 2023-10-01} {id 2 name "Bob Smith" email "bob@example.com" roles[user] active false lastLogin 2023-09-15} {id 3 name "Charlie Brown" email "charlie@example.com" roles[moderator user] active true lastLogin 2023-10-05}] settings{theme dark notifications{email true push false sms true} preferences{language en timezone UTC currency USD}} metadata{version 1.2.3 build 456 features[feature1 feature2 feature3 feature4] config{maxUsers 1000 timeout 30000 retries 3}}}';
const result26 = jsonToCompact(input26);
assertEquals(expected26, result26, 'Large structure with many tokens');
passCount++;
compareTokens(input26, result26, 'Large structure with many tokens token savings');

// Test 27: Strings with many special characters
totalTests++;
console.log('Test 27: Strings with many special characters');
const input27 = {
  greeting: 'Hello 🌍! @#$%^&*()[]{}|;:,.<>?/~`±§',
  symbols: '©®™€£¥¢₹₽₩₦₨₪₫₭₮₯₰₱₲₳₴₵₶₷₹₻₼₽₾₿',
  mixed: 'Test_123-äöüßñç',
  jsonData: '{"key": "value with spaces"}',
  path: '/usr/local/bin/my-app --version 1.0.0'
};
const expected27 = '{greeting "Hello 🌍! @#$%^&*()[]{}|;:,.<>?/~`±§" symbols ©®™€£¥¢₹₽₩₦₨₪₫₭₮₯₰₱₲₳₴₵₶₷₹₻₼₽₾₿ mixed Test_123-äöüßñç jsonData "{"key": "value with spaces"}" path "/usr/local/bin/my-app --version 1.0.0"}';
const result27 = jsonToCompact(input27);
assertEquals(expected27, result27, 'Strings with many special characters');
passCount++;
compareTokens(input27, result27, 'Strings with many special characters token savings');

// Test 28: Parser round-trip test
totalTests++;
console.log('Test 28: Parser round-trip test');
const input28 = { name: 'test', nested: { arr: [1, 'two', true] }, special: 'Hello 🌍!' };
const compact28 = jsonToCompact(input28);
const parsed28 = compactToJson(compact28);

if (deepEqual(input28, parsed28)) {
  console.log('✅ Parser round-trip test');
  passCount++;
} else {
  console.error('❌ Parser round-trip test: Objects are not equal');
  console.log('Original:', JSON.stringify(input28));
  console.log('Parsed:', JSON.stringify(parsed28));
  process.exit(1);
}

console.log('\nTest Summary:');
console.log(`✅ ${passCount}/${totalTests} tests passed!`);

if (passCount === totalTests) {
  console.log('🎉 All tests passed! The jsonToCompact library is fully validated.');
} else {
  console.log('⚠️ Some tests failed. Review the output above.');
}

// Example usage
console.log('\n--- Example Usage ---');
const example = { name: 'test', nested: { arr: [1, 'two', true] }, special: 'Hello 🌍!' };
const compact = jsonToCompact(example);
console.log('Original JSON length:', JSON.stringify(example).length);
console.log('Compact format length:', compact.length);
console.log('Token savings:', ((JSON.stringify(example).length - compact.length) / JSON.stringify(example).length * 100).toFixed(1) + '%');
console.log('Compact format:', compact);

// Round-trip test
const parsed = compactToJson(compact);
console.log('Round-trip successful:', deepEqual(example, parsed));