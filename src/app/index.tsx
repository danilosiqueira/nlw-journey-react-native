import { Input } from "@/components/input";
import { View, Text, Image, Keyboard } from "react-native";
import { MapPin, Calendar as IconCalendar, Settings2, UserRoundPlus, ArrowRight } from "lucide-react-native";

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Calendar } from "@/components/calendar";
import { calendarUtils, DatesSelected } from "@/utils/calendarUtils";
import { DateData } from "react-native-calendars";

enum StepForm {
    TRIP_DETAILS = 1,
    ADD_EMAIL = 2
}

enum VisibleModal {
    NONE = 0,
    CALENDAR = 1,
    GUESTS = 2
}

export default function Index() {
    const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS)
    const [selectedDates, setSelectedDates] = useState({} as DatesSelected)
    const [showModal, setShowModal] = useState(VisibleModal.NONE)

    function handleNextStepForm() {
        if (stepForm === StepForm.TRIP_DETAILS) {
            return setStepForm(StepForm.ADD_EMAIL)
        }
    }

    function handleSelectedDate(selectedDay: DateData) {
        const dates = calendarUtils.orderStartsAtAndEndsAt({
            startsAt: selectedDates.startsAt,
            endsAt: selectedDates.endsAt,
            selectedDay
        })

        setSelectedDates(dates)
    }

    return (
        <View className="flex-1 items-center justify-center px-5">
            <Image 
                source={require("@/assets/logo.png")} 
                className="h-8" 
                resizeMode="contain" 
            />

            <Image source={require("@/assets/bg.png")} className="absolute" ></Image>

            <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
                Convide seus amigos e planeja sua{"\n"}próxima viagem
            </Text>

            <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800">
                <Input>
                    <MapPin color={colors.zinc[400]} size={20}></MapPin>
                    <Input.Field placeholder="Para onde?" editable={stepForm === StepForm.TRIP_DETAILS}></Input.Field>
                </Input>

                <Input>
                    <IconCalendar color={colors.zinc[400]} size={20}></IconCalendar>
                    <Input.Field 
                        placeholder="Quando?" 
                        editable={stepForm === StepForm.TRIP_DETAILS}
                        onFocus={() => Keyboard.dismiss()}
                        showSoftInputOnFocus={false}
                        onPressIn={() => 
                            stepForm === StepForm.TRIP_DETAILS && setShowModal(VisibleModal.CALENDAR)
                        }
                    ></Input.Field>
                </Input>

                { stepForm === StepForm.ADD_EMAIL && (
                    <>
                        <View className="border-b py-3 border-zinc-800">
                            <Button variant="secondary" onPress={() => setStepForm(StepForm.TRIP_DETAILS)}>
                                <Button.Title>Alterar local/data</Button.Title>
                                <Settings2 color={colors.zinc[200]} size={20}></Settings2>
                            </Button>
                        </View>

                        <Input>
                            <UserRoundPlus color={colors.zinc[400]} size={20}></UserRoundPlus>
                            <Input.Field placeholder="Quem estará na viagem?"></Input.Field>
                        </Input>
                    </>
                )}

                <Button onPress={handleNextStepForm}>
                    <Button.Title>{ stepForm == StepForm.TRIP_DETAILS ? "Continuar" : "Confirmar Viagem" }</Button.Title>
                    <ArrowRight color={colors.lime[950]} size={20}></ArrowRight>
                </Button>
            </View>

            <Text className="text-zinc-500 font-regular text-center text-base">
                Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos {" "}
                <Text className="text-zinc-300 underline">
                    termos de uso e políticas de privacidade.
                </Text>
            </Text>

            <Modal
                title="Selecionar datas"
                subtitle="Selecione a data de ida e volta da viagem"
                visible={showModal === VisibleModal.CALENDAR}
                onClose={() => setShowModal(VisibleModal.NONE)}
            >
                <View className="gap-4 mt-4">
                    <Calendar 
                        onDayPress={handleSelectedDate}
                        markedDates={selectedDates.dates} />
                </View>

                <Button onPress={() => setShowModal(VisibleModal.NONE)}>
                    <Button.Title>Confirmar</Button.Title>
                </Button>
            </Modal>

        </View>
    )
}