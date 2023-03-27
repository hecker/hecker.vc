const region = "euw1";

async function fetchSummonerData(summonerName: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`
  );
  return await response.json();
}

async function fetchSummonerDataByPuuid(puuid: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`
  );
  return response.json();
}

export async function checkPlayerExists(playerName: string): Promise<boolean> {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
      playerName
    )}?api_key=${process.env.RIOT_API_KEY}`
  );

  return response.status !== 404;
}

export async function fetchLeagueName(summonerName?: string): Promise<string> {
  if (!summonerName) summonerName = "janhecker";
  const summonerData = await fetchSummonerData(summonerName);
  return summonerData.name;
}

export async function fetchLeagueNameById(summonerId: string): Promise<string> {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${process.env.RIOT_API_KEY}`
  );
  if (!response.ok) {
    return "";
    // throw new Error(`Failed to fetch summoner name for ID ${summonerId}`);
  }
  const data = await response.json();
  return data.name;
}

export async function fetchLeagueRegisteredDate(
  summonerName?: string
): Promise<string> {
  if (!summonerName) summonerName = "janhecker";
  const summonerData = await fetchSummonerData(summonerName);
  const registrationDate = new Date(summonerData.revisionDate);
  return registrationDate.toLocaleDateString();
}

export async function fetchLeagueImageUrl(
  summonerName?: string
): Promise<string> {
  if (!summonerName) summonerName = "janhecker";
  const summonerData = await fetchSummonerData(summonerName);
  const version = "13.5.1";
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summonerData.profileIconId}.png`;
}

export async function fetchLeagueLevel(summonerName?: string): Promise<number> {
  if (!summonerName) summonerName = "janhecker";
  const summonerData = await fetchSummonerData(summonerName);
  return summonerData.summonerLevel;
}

async function fetchRankedData(summonerId: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_KEY}`
  );
  return await response.json();
}

export async function fetchLeagueRank(summonerName?: string): Promise<string> {
  if (!summonerName) summonerName = "janhecker";
  const summonerData = await fetchSummonerData(summonerName);
  const summonerId = summonerData.id;

  const rankedData = await fetchRankedData(summonerId);
  const soloQData = rankedData.find(
    (queue: any) => queue.queueType === "RANKED_SOLO_5x5"
  );

  if (!soloQData) {
    return "Unranked";
  }

  const rank =
    soloQData.tier.charAt(0).toUpperCase() +
    soloQData.tier.slice(1).toLowerCase();
  const division = soloQData.rank;
  const lp = soloQData.leaguePoints;

  return `${rank} ${division} (${lp} LP)`;
}

export async function fetchPlayerWithMostMatches(
  summonerName: string
): Promise<{ name: string; count: number }> {
  const summonerData = await fetchSummonerData(summonerName);
  const summonerPuuid = summonerData.puuid;
  const matchIdsResponse = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=100&api_key=${process.env.RIOT_API_KEY}`
  );
  if (!matchIdsResponse.ok) {
    throw new Error(
      `Failed to fetch match IDs: ${matchIdsResponse.statusText}`
    );
  }
  const matchIds: string[] = await matchIdsResponse.json();
  const playerMatchCounts: Map<string, number> = new Map();
  for (const matchId of matchIds) {
    const matchDataResponse = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`
    );

    if (!matchDataResponse.ok) {
      throw new Error(
        `Failed to fetch match data: ${matchDataResponse.statusText}`
      );
    }

    const matchData = await matchDataResponse.json();
    const participants = matchData.info.participants;
    const participantIds = participants.map(
      (participant: any) => participant.summonerId
    );

    for (const participant of participants) {
      const playerName = await fetchLeagueNameById(participant.summonerId);
      if (
        playerName === summonerName ||
        playerName === "" ||
        playerName === undefined
      ) {
        continue;
      }
      const currentCount = playerMatchCounts.get(playerName) ?? 0;
      playerMatchCounts.set(playerName, currentCount + 1);
    }
  }

  let mostMatchesPlayerName = "Faker";
  let mostMatchesCount = 0;
  for (const [playerName, matchCount] of playerMatchCounts.entries()) {
    if (matchCount > mostMatchesCount) {
      mostMatchesPlayerName = playerName;
      mostMatchesCount = matchCount;
    }
  }
  return { name: mostMatchesPlayerName, count: mostMatchesCount };
  // return { na mostMatchesPlayerName, mostMatchesCount };
  // return "Played " + mostMatchesCount + " games with " + mostMatchesPlayerName;
}
