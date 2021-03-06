import React, {useEffect} from "react";
import {StyleSheet, View, Button, Image, Text, ActivityIndicator, FlatList} from "react-native";
import {useHomeState} from "../hooks";
import {actions} from "app/module/common/home";
import {globalStyles} from "app/util/globalDefinition";
import {useAction} from "core-native";

export const HomeMain = React.memo(() => {
    // welcomeText
    const welcomeText = useHomeState(state => state.welcomeText);
    const changeWelcomeText = useAction(actions.changeWelcomeText);

    // pokemon
    const pokemon = useHomeState(state => state.pokemon);
    const fetchPokemon = useAction(actions.fetchPokemon, "pikachu");
    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    // someData
    const someData = useHomeState(state => state.someData);
    const addLine = useAction(actions.addLine);
    const renderSomeDataItem = ({item}: {item: string}) => <Text>{item}</Text>;

    // Navigation
    const goToDemo = useAction(actions.goToDemoPage);

    return (
        <View style={[globalStyles.flex1Center, styles.container]}>
            <Button title={welcomeText} onPress={changeWelcomeText} />
            <Button title="Go To Demo Page" onPress={goToDemo} />
            {pokemon ? <Image source={{uri: pokemon.sprites.front_default}} style={styles.image} /> : <ActivityIndicator size="large" color="#00ff00" />}
            <Button title="Press Me To Add A Line Below" onPress={addLine} />
            <FlatList data={someData} renderItem={renderSomeDataItem} keyExtractor={item => item} />
        </View>
    );
});

HomeMain.displayName = "HomeMain";

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    container: {
        backgroundColor: "white",
    },
});
