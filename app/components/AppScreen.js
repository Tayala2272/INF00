import React from "react";
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";
import * as NavigationBar from "expo-navigation-bar"



export default function AppScreen({ children,style }){

    NavigationBar.setPositionAsync('absolute')
    NavigationBar.setBackgroundColorAsync('#ffffff00')
    NavigationBar.setVisibilityAsync('hidden')
    NavigationBar.setBehaviorAsync('inset-swipe')

    return (
        <TouchableWithoutFeedback onPress={()=>{if(NavigationBar.getVisibilityAsync!="hidden"){setTimeout(()=>{NavigationBar.setVisibilityAsync('hidden')},2000)}}}>
            <SafeAreaView style={[styles.Container,style]}>
                {children}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    Container:{
        flex:1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.light,
    }
})