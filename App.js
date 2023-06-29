import { Button, Divider, Image } from "@rneui/base";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from "react-native";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page,setPage] = useState(1);

   useEffect(() => {
     fetchData();
   }, []);

  const fetchData = async (page=1) => {
    const result = await axios.get(`https://randomuser.me/api/?results=${page*20}`);
      setData((prevData) => prevData.concat(result.data.results));
      setPage(page+1)
      setIsLoadingMore(false);
  };
 

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      fetchData(page+1)
    }
  };
  

  const renderItem = ({ item }) => {
    return (
      <View key={item.email} style={styles.user}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: item.picture.medium }}
        />
        <View>
          <Text style={styles.name}>
            {item.name.first} - {item.dob.age}
          </Text>
          <Text style={styles.location}>
            {item.location.city} / {item.location.country}
          </Text>
        </View>
      </View>
    );
  };

    const renderFooter = () => {
      if (!isLoadingMore) {
        return null;
      }
      return (
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
        <Text style={styles.title}>FlatList</Text>
      </View>
      <FlatList
        data={data}
        style={styles.flatListContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
        ItemSeparatorComponent={<Divider />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  flatListContainer: {
    flex:1
  },
  header: {
    backgroundColor: "#fefefe",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#555",
    marginTop: 5,
  },
});
