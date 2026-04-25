import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { useUsers } from "../hooks/useUsers";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { useUserContext } from "../context/UserContext";
import { UserCard } from "../components/UserCardComponent";
import { CheckSquare, ChevronLeft, ChevronRight, Square } from "lucide-react-native";

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: { padding: 16, backgroundColor: '#F5F7FA' },
    favoritesContainer: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    emptyState: { textAlign: 'center', marginVertical: 20, color: 'gray' },
    retryButton: { marginTop: 10, padding: 10, backgroundColor: 'red', borderRadius: 8 },
    miniCard: { marginRight: 15, alignItems: 'center', width: 70 },
    miniAvatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
    miniName: { fontSize: 12, textAlign: 'center' },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        marginLeft: 8,
        fontSize: 13,
        color: '#4B5563',
    },
    orderText: {
        fontSize: 12,
        color: '#6B7280',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pageButton: {
        padding: 6,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 4,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 28,
    },
    pageButtonActive: {
        borderColor: '#3B82F6',
        backgroundColor: '#EFF6FF',
    },
    pageTextActive: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: 'bold',
    },
    bulkButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bulkButtonDisabled: {
        backgroundColor: '#F3F4F6',
    },
    bulkButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    bulkTextDisabled: {
        color: '#9CA3AF',
    }
});

export const HomeScreen = () => {
    const { data: users, isLoading, isError, refetch, isFetching } = useUsers();
    const { toggleFavorite, toggleSelectedOrdered, favorites, selectedIds, clearSelection, selectAll, addManyFavorites } = useUserContext();
    const navigation = useNavigation<any>();
    const favoriteUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user: any) => favorites && favorites[user.login.uuid]);
    }, [users, favorites]);

    const isAllSelected = users && users.length > 0 && selectedIds.length === users.length;

    const handleToggleAll = () => {
        console.log(isAllSelected);
        if (isAllSelected) {
            clearSelection();
        } else {
            selectAll(users || []);
        }
    };


    if (isLoading) return <ActivityIndicator size="large" color="#001bb3" style={styles.center} />;

    if (isError) return (
        <View style={styles.center}>
            <Text>Error al cargar usuarios.</Text>
            <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
                <Text style={{ color: 'white' }}>Reintentar</Text>
            </TouchableOpacity>
        </View>
    );


    const renderHeader = () => {
        if (favoriteUsers.length === 0) {
            return <Text style={styles.emptyState}> Aún no tienes favoritos</Text>;
        }
        return (

            <View style={styles.favoritesContainer}>
                <Text style={styles.sectionTitle}>Favoritos</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={favoriteUsers}
                    keyExtractor={(item) => `fav-${item.login.uuid}`}
                    renderItem={({ item }: { item: any }) => (
                        <TouchableOpacity
                            style={styles.miniCard}
                            onPress={() => navigation.navigate('Detail', { userId: item.login.uuid })}
                        >
                            <Image source={{ uri: item.picture.thumbnail }} style={styles.miniAvatar} />
                            <Text numberOfLines={1} style={styles.miniName}>{item.name.last}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.login.uuid}
                refreshing={isFetching}
                onRefresh={refetch}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                        isFavorite={!!favorites?.[item.login.uuid]}
                        isSelected={!!selectedIds?.includes(item.login.uuid)}
                        onPressDetail={() => navigation.navigate('Detail', { userId: item.login.uuid })}
                        onToggleSelect={() => toggleSelectedOrdered(item.login.uuid, users)}
                        onToggleFavorite={() => toggleFavorite(item.login.uuid)}
                    />
                )}
            />

            <View style={styles.footerContainer}>

                <TouchableOpacity style={styles.footerLeft} onPress={handleToggleAll} activeOpacity={0.7}>
                    {isAllSelected ? (
                        <CheckSquare color="#0056b3" fill="#E6F0FA" size={20} />
                    ) : (
                        <Square color="#9CA3AF" size={20} />
                    )}
                    <Text style={styles.footerText}>Seleccionar todos</Text>
                </TouchableOpacity>

                <Text style={styles.orderText}>Orden: <Text style={{ fontWeight: 'bold' }}>Apellido ↑</Text></Text>

                <View style={styles.paginationContainer}>
                    <TouchableOpacity style={styles.pageButton}>
                        <ChevronLeft color="#9CA3AF" size={16} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.pageButton, styles.pageButtonActive]}>
                        <Text style={styles.pageTextActive}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pageButton}>
                        <ChevronRight color="#9CA3AF" size={16} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};
