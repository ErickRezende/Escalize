import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e8f1e9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 70,
        width: '100%',
        height: 'auto',
        left: 5
    },

    date: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#005231',
        marginBottom: 12,
    },

    section: {
        marginBottom: 16,
    },

    sectionTitle: {
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 6,
        color: '#005231',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    role: {
        width: 100,
        fontWeight: 'bold',
        color: '#005231',
        //paddingRight: 15
    },

    membersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%'
    },

    memberBadge: {
        backgroundColor: '#ccecd7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginRight: 6,
        marginBottom: 6,
        maxWidth: '100%',
    },

    addButton: {
        backgroundColor: '#005231',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginBottom: 6
    },

    addButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    musicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    playButton: {
        marginRight: 10,
    },

    musicText: {
        fontWeight: '500',
        color: '#005231',
    },

    obsText: {
        fontStyle: 'italic',
        color: '#4a7a4d',
    },

    iconButton: {
        paddingHorizontal: 12,
    },

    selectContainer: {
        padding: 10,
        backgroundColor: '#eefef0',
        borderRadius: 8,
        marginVertical: 10
    },

    radioOption: {
        padding: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    radioOptionSelected: {
        backgroundColor: '#c7f5cc',
        borderColor: '#005231',
    },
    confirmButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#005231',
        borderRadius: 6,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },

    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    selectContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 4
    },
})

export default styles
