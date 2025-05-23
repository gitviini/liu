import { useFonts } from 'expo-font';
import { StyleSheet } from "react-native"
import CONSTANTS from "./constants"
import COLORS from "./colors"

export const stylePattern = StyleSheet.create({
	containerTitle: {
		gap: 0
	},
	title: {
		fontFamily: "Poppins",
		fontSize: CONSTANTS.fontLarge,
		color: COLORS.foreground,
	},
	subTitle: {
		fontFamily: "Poppins",
		fontSize: CONSTANTS.fontMedium,
		color: COLORS.foreground,
	},
	paragraph: {
		fontFamily: "Poppins",
		fontSize: CONSTANTS.fontSmall,
		color: COLORS.foreground,
	},
	link: {
		fontFamily: "Poppins",
		fontSize: CONSTANTS.fontSmall,
		padding: CONSTANTS.paddingMedium,
		color: COLORS.foreground,
	},
	containerPicker: {
		backgroundColor: COLORS.white,
		boxShadow: CONSTANTS.boxShadow,
		borderRadius: CONSTANTS.borderRadiusLarge,
		height: 41.5,
		justifyContent: "center",
		overflow: "hidden",
		width: "100%",
		maxWidth: CONSTANTS.maxWidth,
	},
	picker: {
		outlineWidth: 0,
		borderWidth: 0,
		paddingHorizontal: CONSTANTS.paddingSmall,
		color: COLORS.foreground,
		width: "100%",
		maxWidth: CONSTANTS.maxWidth - 50,
		fontSize: CONSTANTS.fontSmall,
		cursor: "pointer"
	},
	scrollHorizontal: {
		paddingLeft: 0,
		padding: CONSTANTS.paddingSmall,
		paddingBottom: CONSTANTS.paddingLarge
	}
})