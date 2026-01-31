import React, {useState} from 'react';
import {View, Text, Pressable} from "react-native";

import HelpRequestsList from "@/components/help-requests-list";
import CreateHelpRequestModal from "@/components/create-help-request-modal";

const HelpRequestsScreen = () => {
    return (
        <View>

            <HelpRequestsList />
        </View>
    );
};

export default HelpRequestsScreen;