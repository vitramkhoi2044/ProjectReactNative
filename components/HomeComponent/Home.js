import React, { Component } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Apple from "./Apple";
import SamSung from "./SamSung";
import Oppo from "./Oppo";
import Xiaomi from "./Xiaomi";
import Huawei from "./Huawei";

class Home extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <Apple />
                    <SamSung />
                    <Oppo />
                    <Xiaomi />
                    <Huawei />
                </ScrollView>
            </View>
        );
    }
}
export default Home;