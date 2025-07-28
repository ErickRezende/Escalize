import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdminOnly from '../wrappers/AdminOnly/AdminOnly';

import styles from './style';
import { useState } from 'react';

const rolesNames = {
    "booth": "Cabine",
    signs: "Comando",
    ministering: "Ministração",
    welcome: "Boas-vindas",
    vocal: "Vocal",
    instrumental: "Instrumental"
}

const weeksDay = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

const allMembers = [
    { _id: '1', name: 'João' },
    { _id: '2', name: 'Maria' },
    { _id: '3', name: 'Pedro' },
    { _id: '4', name: 'Ana' }
];


export default function LineUp({ data }) {
    if (!data) return null

    const {
        date,
        rehearsalDates,
        booth,
        signs,
        ministering,
        welcome,
        vocal,
        instrumental,
        musics,
        obs
    } = data

    if (
        !data.date ||
        !data.rehearsalDates ||
        !data.booth ||
        !data.signs ||
        !data.ministering ||
        !data.welcome ||
        !data.vocal ||
        !data.instrumental ||
        !data.musics ||
        false//!data.obs
    ) {
        return null;
    }

    const [selectingRole, setSelectingRole] = useState(null);
    const [selectedMemberId, setSelectedMemberId] = useState(null);

    const [lineup, setLineup] = useState({
        date: new Date(date),
        rehearsalDates: rehearsalDates,
        roles: {
            booth: booth,
            signs: [signs],
            ministering: [ministering],
            welcome: [welcome],
            vocal: vocal,
            instrumental: instrumental
        },
        musics: musics,
        obs: obs
    })

    const handleAddMember = () => {
        if (!selectedMemberId || !selectingRole) return;

        const member = allMembers.find(m => m._id === selectedMemberId);
        if (!member) return;

        setLineup(prev => ({
            ...prev,
            roles: {
                ...prev.roles,
                [selectingRole]: [...prev.roles[selectingRole], member]
            }
        }));
        setSelectingRole(null);
        setSelectedMemberId(null);
    }


    return (
        <View style={styles.card}>
            <Text style={styles.date}>{
                `${weeksDay[lineup.date.getDay()]} ${lineup.date.getDate()}/${lineup.date.getMonth() + 1}/${lineup.date.getFullYear()} ${lineup.date.getHours()}:${lineup.date.getMinutes()}h`
            }</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Escala</Text>

                {
                    Object.entries(lineup.roles).map(([key, members]) => (
                        <View key={key} style={styles.row}>
                            <Text style={styles.role}>{rolesNames[key]}:</Text>
                            <View style={styles.membersContainer}>
                                {members.map((member, i) => (
                                    <View key={i} style={styles.memberBadge}>
                                        <Text style={styles.memberText}>{member.name}</Text>
                                    </View>
                                ))}
                                <AdminOnly>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={() => setSelectingRole(key)}
                                    >

                                        <Text style={styles.addButtonText}>+</Text>

                                    </TouchableOpacity>
                                </AdminOnly>
                            </View>
                        </View>

                    ))
                }

                {
                    selectingRole && (
                        <View style={styles.overlay}>
                            <Pressable style={styles.background} onPress={() => setSelectingRole(null)} />

                            <View style={styles.selectContainer}>
                                <Text style={styles.sectionTitle}>Selecionar membro para: {rolesNames[selectingRole]}</Text>

                                {allMembers
                                    .filter(member =>
                                        !lineup.roles[selectingRole]?.some(m => m._id === member._id)
                                    )
                                    .map(member => (
                                        <TouchableOpacity
                                            key={member._id}
                                            style={[
                                                styles.radioOption,
                                                selectedMemberId === member._id && styles.radioOptionSelected
                                            ]}
                                            onPress={() => setSelectedMemberId(member._id)}
                                        >
                                            <Text style={styles.memberText}>{member.name}</Text>
                                        </TouchableOpacity>
                                    ))}

                                {selectedMemberId && (
                                    <TouchableOpacity onPress={handleAddMember} style={styles.confirmButton}>
                                        <Text style={styles.confirmText}>Adicionar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )
                }

            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Repertório</Text>
                {
                    lineup.musics.map((music, i) => (
                        <View key={i} style={styles.musicRow}>
                            <TouchableOpacity style={styles.playButton}>
                                <Ionicons name="play" size={16} color={'#005231'} />
                            </TouchableOpacity>
                            <Text style={styles.musicText}>{music}</Text>
                        </View>
                    ))
                }
            </View>

            {lineup.obs != "" &&
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Observações</Text>
                    <Text style={styles.obsText}>{lineup.obs}</Text>
                </View>
            }
        </View>
    )
}
