import { View, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CONSTANTS from '@/contants/constants';
import COLORS from '@/contants/colors';

export default function NavBar({ state , descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.pressable}
            key={index}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text, textAlign: "center" }}>
              {label.toString()}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "93%",
        flexDirection: "row",
        alignSelf: "center",
        height: 60,
        bottom: CONSTANTS.paddingLarge * 1.5,
        boxShadow: CONSTANTS.boxShadow,
        borderRadius: CONSTANTS.borderRadiusLarge,
        overflow: "hidden",
        backgroundColor: COLORS.white,
    },
    pressable :{
        flex: 1,
        height: 60,
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
        borderRadius: CONSTANTS.borderRadiusTotal
    }
})