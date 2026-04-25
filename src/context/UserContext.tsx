import { createContext, useContext, useState } from "react";

type UserLocalState = {
    favorites: Record<string, boolean>;
    selectedIds: string[];
    localPhones: Record<string, string>;
};

const Context = createContext<any>(null);

export const UserProvider = ({ children }: any) => {

    const [state, setState] = useState<UserLocalState>({
        favorites: {},
        selectedIds: [],
        localPhones: {}
    });

    const toggleFavorite = (userId: string) => {
        setState((s) => ({
            ...s,
            favorites: {
                ...(s.favorites || {}),
                [userId]: !(s.favorites || {})[userId]
            },
        }));
    };

    const addManyFavorites = (userIds: string[]) => {

    };

    const updateLocalPhone = (userId: string, phone: string) => {
        setState((s) => ({
            ...s,
            localPhones: {
                ...(s.localPhones || {}),
                [userId]: phone
            },
        }));
    };

    const toggleSelectedOrdered = (userId: string, orderedUsers: any[]) => {
        setState((s) => {
            const currentSelected = s.selectedIds || [];
            const index = orderedUsers.findIndex((u) => u.login.uuid === userId);
            const isSelected = currentSelected.includes(userId);

            if (!isSelected) {
                const prevUserId = index > 0 ? orderedUsers[index - 1].login.uuid : null;
                if (index === 0 || (prevUserId && currentSelected.includes(prevUserId))) {
                    return { ...s, selectedIds: [...currentSelected, userId] };
                } else {
                    alert(`Debe seleccionar en orden`);
                    return s;
                }
            } else {
                const nextUserId = index < orderedUsers.length - 1 ? orderedUsers[index + 1].login.uuid : null;
                if (!nextUserId || !currentSelected.includes(nextUserId)) {
                    return { ...s, selectedIds: currentSelected.filter((id) => id !== userId) };
                } else {
                    alert("No se puede quitar la selección si hay usuarios posteriores marcados.");
                    return s;
                }
            }
        });
    };

    const selectAll = (orderedUsers: any[]) => {
        setState((s) => ({
            ...s,
            selectedIds: orderedUsers.map(user => user.login.uuid),
        }));
    };
    const clearSelection = () => {
        setState((s) => ({
            ...s,
            selectedIds: [],
        }));
    };

    return (
        <Context.Provider
            value={{
                ...state,
                toggleFavorite,
                addManyFavorites,
                toggleSelectedOrdered,
                selectAll,
                updateLocalPhone,
                clearSelection,
            }}
        >
            {children}
        </Context.Provider>
    );
};
export const useUserContext = () => {
    const context = useContext(Context);
    if (!context) {
        return { favorites: {}, selectedIds: [], localPhones: {} };
    }
    return context;
};