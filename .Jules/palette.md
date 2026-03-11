## 2026-03-11 - Accessibility for icon-only buttons
**Learning:** Icon-only `TouchableOpacity` components in React Native apps do not provide any context to screen readers by default. They require explicit accessibility props to be announced properly.
**Action:** When creating icon-only buttons with `TouchableOpacity`, always add `accessibilityRole="button"`, `accessibilityLabel` (for the primary action), and relevant `accessibilityState` or `accessibilityHint` props to ensure proper screen reader compatibility.
