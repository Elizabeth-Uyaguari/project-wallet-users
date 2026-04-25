import { useNavigation, useRoute } from "@react-navigation/native";
import { useUsers } from "../hooks/useUsers";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const DetailScreen = () => {
    const route = useRoute<any>();
    const { userId } = route.params;
    const { data: users } = useUsers();
    const { localPhones, updateLocalPhone, favorites, toggleFavorite } = useUserContext();
    const user = users?.find((u: any) => u.login.uuid === userId);
    const [phoneInput, setPhoneInput] = useState(localPhones[userId] || '');
    const [errorText, setErrorText] = useState('');

    if (!user) return <Text style={styles.center}>Usuario no encontrado</Text>

    const isFavorite = !!favorites[userId];

    const handleSavePhone = () => {
        if (phoneInput.trim() === '') {
            setErrorText('El teléfono no puede estar vacío');
            return;
        }
        if (phoneInput.length < 9) {
            setErrorText('Debe tener al menos 10 caracteres');
            return;
        }

        updateLocalPhone(userId, phoneInput);
        setErrorText('');
        alert('Teléfono local guardado con éxito');
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: user.picture.large }} style={styles.avatar} />

            <Text style={styles.name}>{user.name.first} {user.name.last}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.info}>{user.location.city}, {user.location.country}</Text>

            <TouchableOpacity
                style={[styles.favButton, isFavorite ? styles.favActive : styles.favInactive]}
                onPress={() => toggleFavorite(userId)}
            >
                <Text style={styles.favText}>{isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}</Text>
            </TouchableOpacity>

            <View style={styles.phoneSection}>
                <Text style={styles.label}>Teléfono Original:</Text>
                <Text style={styles.originalPhone}>{user.phone}</Text>

                <Text style={styles.label}>Teléfono Local (Editable):</Text>
                <TextInput
                    style={[styles.input, errorText ? styles.inputError : null]}
                    value={phoneInput}
                    onChangeText={(text) => {
                        setPhoneInput(text);
                        setErrorText('');
                    }}
                    keyboardType="phone-pad"
                    placeholder="Ej: 0991234567"
                />
                {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

                <TouchableOpacity style={styles.saveButton} onPress={handleSavePhone}>
                    <Text style={styles.saveText}>Guardar Teléfono</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { padding: 20, alignItems: 'center', backgroundColor: 'white', flexGrow: 1 },
    avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
    name: { fontSize: 24, fontWeight: 'bold' },
    info: { fontSize: 16, color: 'gray', marginBottom: 5 },

    favButton: { padding: 10, borderRadius: 8, marginVertical: 15, width: '100%', alignItems: 'center' },
    favActive: { backgroundColor: '#FFE4E1' },
    favInactive: { backgroundColor: '#F0F0F0' },
    favText: { fontWeight: '600', color: '#333' },

    phoneSection: { width: '100%', marginTop: 20, padding: 15, backgroundColor: '#F9FAFB', borderRadius: 10 },
    label: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
    originalPhone: { fontSize: 16, marginBottom: 10, color: 'gray' },

    input: { borderWidth: 1, borderColor: '#DDD', padding: 10, borderRadius: 8, marginTop: 5, backgroundColor: 'white' },
    inputError: { borderColor: 'red' },
    errorText: { color: 'red', fontSize: 12, marginTop: 5 },

    saveButton: { backgroundColor: '#0056b3', padding: 12, borderRadius: 8, marginTop: 15, alignItems: 'center' },
    saveText: { color: 'white', fontWeight: 'bold' }
});