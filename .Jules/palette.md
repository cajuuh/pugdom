## 2024-05-15 - Missing ARIA Labels on Icon-only TouchableOpacities
**Learning:** Found an accessibility issue pattern where `TouchableOpacity` components containing only icons (like those in `StatusActionBar`) lack explicit ARIA labels and roles, rendering them unreadable or confusing to screen reader users in this React Native app.
**Action:** When adding new icon-only buttons, always ensure `accessibilityRole="button"` and `accessibilityLabel` are set. If the button toggles state, use `accessibilityState={{ checked: isChecked }}` or dynamically change the `accessibilityLabel`.
