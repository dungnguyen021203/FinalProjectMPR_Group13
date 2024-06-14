import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { UnifiedContext } from "../../components/context/Context";
import FolderForm from "../../components/noteManage/FolderForm";

function NewFolderScreen({ navigation }) {
    const { addFolder } = useContext(UnifiedContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'New Folder',
        });
    }, [navigation]);

    function confirmHandler(folderData) {
        addFolder(folderData);
        navigation.goBack();
    }

    return (
        <View>
            <FolderForm onSubmit={confirmHandler} />
        </View>
    );
}

export default NewFolderScreen;
