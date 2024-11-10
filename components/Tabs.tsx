import React, { useState, useEffect } from 'react';
import styles from '../styles/Tabs.module.css';

interface Game {
    id: number;
    name: string;
    description: string;
    provider: string;
    uniqueId: string;
}

const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('START');
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
    const [games, setGames] = useState<Game[]>([]);
    const [originalGames, setOriginalGames] = useState<Game[]>([]);
    const [favoritedGames, setFavoritedGames] = useState<Map<string, boolean>>(new Map());
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [providers, setProviders] = useState<Set<string>>(new Set());

    const handleTabClick = async (tabName: string) => {
        setSelectedTab(tabName);
        // Fetch the games based on the selected tab
        const fetchGames = new Promise<Game[]>((resolve, reject) => {
            fetch(`api/games/${tabName}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Bad Network Response');
                    }
                    return response.json();
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });

        try {
            const data = await fetchGames;
            setGames(data);
            setOriginalGames(data);
            const newProviders = new Set(data.map((game) => game.provider));
            setProviders(newProviders);
        } catch (error) {
            console.error('Error fetching games:', error);
            setGames([]);
            setOriginalGames([]);
        }
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

        if (e.target.value.trim() === '') {
            const fetchGames = new Promise<Game[]>((resolve, reject) => {
                fetch(`api/games/${selectedTab}`)
                    .then((response) => response.json())
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });

            try {
                const data = await fetchGames;
                console.log('Fetched Games:', data);
                setGames(originalGames);
            } catch (error) {
                console.error('Error fetching games:', error);
                setGames([]);
            }
        } else {
            const filteredGames = originalGames.filter((game) =>
                game.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setGames(filteredGames);
        }
    };

    const toggleFavorite = (uniqueId: string) => {
        setFavoritedGames((prev) => {
            const updatedFavorites = new Map(prev);
            const isFavorited = updatedFavorites.get(uniqueId) || false;
            updatedFavorites.set(uniqueId, !isFavorited);
            return updatedFavorites;
        });
    };

    const handleFilterClick = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const closePopup = () => {
        setIsFilterVisible(false);
    };

    const filterByProvider = (provider: string) => {
        const filteredGames = originalGames.filter((game) => {
            const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesProvider = game.provider === provider;
            return matchesSearch && matchesProvider;
        });
        setGames(filteredGames);
        closePopup();
    };

    useEffect(() => {
        handleTabClick(selectedTab); // Fetch games when tab is first selected
    }, [selectedTab]);

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${selectedTab === 'SEARCH' ? styles.selected : ''}`}
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                >
                    SEARCH
                </div>
                <div className={styles.lineDiv}>
                    |
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'START' ? styles.selected : ''}`}
                    onClick={() => handleTabClick('START')}
                >
                    START
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'NEW' ? styles.selected : ''}`}
                    onClick={() => handleTabClick('NEW')}
                >
                    NEW
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'SLOTS' ? styles.selected : ''}`}
                    onClick={() => handleTabClick('SLOTS')}
                >
                    SLOTS
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'LIVE' ? styles.selected : ''}`}
                    onClick={() => handleTabClick('LIVE')}
                >
                    LIVE
                </div>
                <div
                    className={`${styles.tab} ${selectedTab === 'JACKPOT' ? styles.selected : ''}`}
                    onClick={() => handleTabClick('JACKPOT')}
                >
                    JACKPOT
                </div>
            </div>

            {isSearchVisible && (
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchBar}
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className={styles.filterBtn} onClick={handleFilterClick}>Filter</button>
                </div>
            )}

            {isFilterVisible && (
                <div className={styles.filterPopup}>
                    <div className={styles.popupContent}>
                        <h2>Filter Options</h2>
                        <div className={styles.providerButtons}>
                            {Array.from(providers).map((provider) => (
                                <button
                                    key={provider}
                                    className={styles.providerBtn}
                                    onClick={() => filterByProvider(provider)}
                                >
                                    {provider}
                                </button>
                            ))}
                        </div>
                        <button onClick={closePopup}>Close</button>
                    </div>
                    <div className={styles.popupOverlay} onClick={closePopup}></div>
                </div>
            )}

            <div className={styles.gamesList}>
                {games.length > 0 ? (
                    games.map((game) => (
                        <div key={game.uniqueId} className={styles.gameItem}>
                            <h3>{game.name}</h3>
                            <span
                                className={`${styles.starIcon} ${favoritedGames.get(game.uniqueId) ? styles.favorited : ''}`}
                                onClick={() => toggleFavorite(game.uniqueId)}
                            >
                                ★
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No games available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Tabs;
