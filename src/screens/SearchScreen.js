import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { contactDetails } from "../constants/staticData";
import ContactListItem from "../components/ContactListItem";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchScreen = () => {
	const [filterData, setFilterData] = useState(contactDetails);
	const [data, setData] = useState(contactDetails);
	const [search, setSearch] = useState(null);
	const [isAscending, setIsAscending] = useState(false);

	const onSearch = (text) => {
		setSearch(text);
		setFilterData(
			data.filter((item) => {
				return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
			})
		);
	};

	const clear = () => {
		setSearch(null);
		setFilterData(contactDetails);
	};

	const sort = () => {
		if (isAscending) {
			setIsAscending(false);
			const sortedDataAscending = data.sort((a, b) =>
				a.name > b.name ? 1 : -1
			);
			setFilterData([...sortedDataAscending]);
		} else {
			setIsAscending(true);
			const sortedDataDescending = data.sort((a, b) =>
				a.name > b.name ? -1 : 1
			);
			setFilterData([...sortedDataDescending]);
		}
	};

	return (
		<View style={{ marginVertical: 2, flex: 1 }}>
			<View style={styles.searchBar}>
				<EvilIcons name="search" size={24} color="black" />
				<TextInput
					placeholder="search item here..."
					style={{ width: "76%", height: 50 }}
					value={search}
					onChangeText={(text) => {
						onSearch(text);
					}}
					selectionColor="green"
				/>
				<MaterialIcons
					name="clear"
					size={24}
					color="black"
					onPress={() => clear()}
				/>
				<FontAwesome5
					name={`${isAscending ? "sort-alpha-up" : "sort-alpha-down"}`}
					size={24}
					color="gray"
					style={{ marginLeft: 10 }}
					onPress={() => sort()}
				/>
			</View>
			<FlatList
				data={filterData}
				renderItem={({ item }) => <ContactListItem contact={item} />}
				keyExtractor={(item, index) => {
					return item.id;
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	listContainer: {},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 35,
		paddingHorizontal: 20,
	},
});
export default SearchScreen;
