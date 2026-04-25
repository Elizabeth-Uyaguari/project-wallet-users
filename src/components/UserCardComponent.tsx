import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, CheckSquare, Square } from 'lucide-react-native';


interface UserCardProps {
    user: any;
    isFavorite: boolean;
    isSelected: boolean;
    onPressDetail: () => void;
    onToggleSelect: () => void;
    onToggleFavorite: () => void;
}

export const UserCard = ({
    user,
    isFavorite,
    isSelected,
    onPressDetail,
    onToggleSelect,
    onToggleFavorite
}: UserCardProps) => {

    return (
        <View style={styles.cardContainer}>

            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={onToggleSelect}
                activeOpacity={0.7}
            >
                {isSelected ? (
                    <CheckSquare color="#0056b3" fill="#E6F0FA" size={24} />
                ) : (
                    <Square color="#CBD5E1" size={24} />
                )}
            </TouchableOpacity>

            <Image
                source={{ uri: user.picture.thumbnail }}
                style={styles.avatar}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.nameText} numberOfLines={1}>
                    {user.name.first} {user.name.last}
                </Text>
                <Text style={styles.subText} numberOfLines={1}>
                    {user.email}
                </Text>
                <Text style={styles.subText} numberOfLines={1}>
                    {user.location.city}, {user.location.country}
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.detailButton} onPress={onPressDetail}>
                    <Text style={styles.detailButtonText}>Detalle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={onToggleFavorite}
                >
                    <Heart
                        color={isFavorite ? "#EF4444" : "#9CA3AF"}
                        fill={isFavorite ? "#EF4444" : "transparent"}
                        size={24}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginVertical: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    checkboxContainer: {
        marginRight: 12,
        justifyContent: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 2,
    },
    subText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginRight: 10,
    },
    detailButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    favoriteButton: {
        padding: 4,
    }
});