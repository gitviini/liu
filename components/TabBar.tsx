import * as React from 'react';
import { View, StyleSheet, ColorValue, Dimensions, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Lucide from "lucide-react-native"
import Constants from '@/constants/Constants';
import { stylePattern } from '@/constants/stylePattern';
import Colors from '@/constants/Colors';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const screen = Dimensions.get("screen")

    const Icons: any = {
        "Início": (props: { color: ColorValue, size: number }) => <Lucide.Home color={props.color} size={props.size} />,
        "Relatório": (props: { color: ColorValue, size: number }) => <Lucide.LayoutDashboard color={props.color} size={props.size} />,
        "Perfil": (props: { color: ColorValue, size: number }) => <Lucide.User color={props.color} size={props.size} />,
    }

    return (
        <View style={{ ...styles.tabContainer, width: screen.width - (Constants.paddingHigh * 2) }}>
            {state.routes.map((route, index) => {
                const top = useSharedValue(0);
                const scale = useSharedValue(1);
                const opacity = useSharedValue(1);

                const style = useAnimatedStyle(() => {
                    return {
                        top: withTiming(top.value, {
                            duration: 100,
                        }),
                        transform: [{scale: withTiming(scale.value, {duration: 200})}],
                    };
                });

                const styleText = useAnimatedStyle(() => {
                    return {
                        opacity: withTiming(opacity.value, {
                            duration: 200,
                        }),
                    };
                });

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

                React.useEffect(() => {
                    top.value = isFocused ? 11 : 0
                    scale.value = isFocused ? 1.8 : 1
                    opacity.value = isFocused ? 0 : 1
                }, [top, scale, opacity, isFocused])

                return (
                    <Pressable
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                        key={index}
                    >
                        <Animated.View style={[{top: 11, transform: [{scale: 1}]}, style]}>
                            {Icons[route.name]({ color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor, size: stylePattern.subtitle.fontSize })}
                        </Animated.View>
                        <Animated.Text style={[
                            {
                                opacity: 1,
                                color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor,
                                ...stylePattern.paragraph
                            },
                            styleText]}
                        >
                            {label.toString()}
                        </Animated.Text>
                    </Pressable>
                );
            })}
        </View >
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        position: "fixed",
        bottom: Constants.paddingHigh,
        left: Constants.paddingHigh,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: Constants.paddingSmall,
        paddingBottom: 0,
        backgroundColor: Colors.light.white,
        borderRadius: 100,
        boxShadow: Constants.boxShadow,
    },
    tabItem: {
        justifyContent: "center",
        alignItems: "center",
        padding: Constants.paddingMedium,
        gap: Constants.gapSmall,
        borderRadius: Constants.borderRadiusHigh,
    }
})