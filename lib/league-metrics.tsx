const region = "euw1";

async function fetchSummonerData(summonerName: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`
  );
  return await response.json();
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
): Promise<string> {
  const summonerData = await fetchSummonerData(summonerName);
  const summonerId = summonerData.id;

  const matchData = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerData.accountId}?queue=420&endIndex=100&api_key=${process.env.RIOT_API_KEY}`
  );

  if (matchData.status === 200 || 400) {
    console.log("Access to match data is forbidden.");
    return "";
  }

  const matchList = await matchData.json();

  const opponents: { [name: string]: number } = {};

  for (let i = 0; i < matchList.matches.length; i++) {
    const match = matchList.matches[i];
    const participantId = match.participantIdentities.find(
      (p: any) => p.player.summonerId === summonerId
    ).participantId;
    const participant = match.participants.find(
      (p: any) => p.participantId === participantId
    );
    const opponentId = match.participantIdentities.find(
      (p: any) => p.participantId !== participantId
    ).player.summonerId;
    const opponentName = await fetchSummonerData(opponentId).then(
      (data) => data.name
    );

    if (opponentName in opponents) {
      opponents[opponentName]++;
    } else {
      opponents[opponentName] = 1;
    }
  }

  let mostMatches = "";
  let maxMatches = -1;
  for (const [opponentName, numMatches] of Object.entries(opponents)) {
    if (numMatches > maxMatches) {
      mostMatches = opponentName;
      maxMatches = numMatches;
    }
  }
  return mostMatches;
}
