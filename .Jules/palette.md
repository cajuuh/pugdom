## 2024-05-15 - Add accessibility traits to icon-only buttons
**Learning:** In React Native, `TouchableOpacity` elements that only contain an icon and no text must have `accessibilityRole="button"`, `accessibilityLabel`, and an `accessibilityState` prop if it toggles a state, otherwise screen readers will just read the type of element without context.
**Action:** Always add these accessibility properties to any icon-only touchable component.
