## 2024-06-18 - Missing Accessibility on Icon-Only Actions
**Learning:** Icon-only action bars (like reply, favorite, reblog) are completely opaque to screen readers if they lack accessibility roles and labels. The existing `TouchableOpacity` components only conveyed an interaction was possible, not what it did.
**Action:** Always add `accessibilityRole="button"`, descriptive `accessibilityLabel`, and relevant `accessibilityState` (like checked status) to icon-only buttons to ensure they are fully usable by visually impaired users.
