import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const ContactListItem = ({ contact, user }) => {
	return (
		<View style={styles.container}>
			<Image
				source={contact ? contact.image : { uri: user.image }}
				style={styles.image}
			/>
			<View style={styles.content}>
				<View>
					<Text style={styles.name}>
						{contact ? contact.name : user.firstname}
					</Text>
					<Text style={styles.subtitle}>
						{contact ? contact.status : user.email}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5,
		height: 70,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "lightgray",
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10,
	},
	content: {
		flex: 1,
	},
	name: {
		fontWeight: "bold",
		marginBottom: 5,
	},
	subtitle: {
		color: "gray",
	},
});

export default ContactListItem;
