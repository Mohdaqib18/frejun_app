import React, { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "../../store/redux/store";
import { refreshUserData } from "../../store/redux/store";

import { useFocusEffect } from "@react-navigation/native";
import { API_KEY } from "@env";

const FetchScreen = () => {
	const userData = useSelector((state) => state.userDataStore.userData);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [refreshing, setRefreshing] = useState(true);

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "fake-data3.p.rapidapi.com",
		},
	};
	const loadUserData = () => {
		fetch("https://fake-data3.p.rapidapi.com/fk/users?_gender=female", options)
			.then((response) => response.json())
			.then((response) => {
				setRefreshing(false);

				dispatch(refreshUserData(response.data));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	function fetchMoreData() {
		setCurrentPage((prevState) => prevState + 1);
	}

	useEffect(() => {
		fetch("https://fake-data3.p.rapidapi.com/fk/users?_gender=female", options)
			.then((response) => response.json())

			.then((response) => {
				dispatch(addUserData(response.data));
			})
			.catch((err) => console.error(err));
	}, [currentPage]);

	useFocusEffect(React.useCallback(loadUserData, []));

	return (
		<View>
			<FlatList
				data={userData}
				renderItem={({ item }) => <ContactListItem user={item} />}
				keyExtractor={(item, index) => {
					return index;
				}}
				onEndReached={fetchMoreData}
				onEndReachedThreshold={0.5}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
				}
			/>
		</View>
	);
};

export default FetchScreen;
