import "@/styles/global.css"
import "@/utils/dayjsLocaleConfig"

import { 
    useFonts, 
    Inter_500Medium, 
    Inter_400Regular, 
    Inter_600SemiBold
} from "@expo-google-fonts/inter";


import { View, StatusBar } from "react-native";
import { Slot } from "expo-router";

import { Loading } from "@/components/loading";

export default function Layout() {
    const [fonstLoaded] = useFonts({
        Inter_500Medium, 
        Inter_400Regular, 
        Inter_600SemiBold
    })

    if (!fonstLoaded) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-zinc-950">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Slot/>
        </View>
    )
}