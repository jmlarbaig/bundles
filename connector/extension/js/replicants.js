
// From Extension
const ipAddress = nodecg.Replicant('ipAddress')
const timeNTP = nodecg.Replicant('timeNTP')
const nowNtp = nodecg.Replicant('nowNtp')
const Mqtt_connected = nodecg.Replicant('Mqtt_connected')

// Assets
const logoEvent = nodecg.Replicant('assets:logoEvent')
const sponsor = nodecg.Replicant('assets:sponsors')
const mainSponsors = nodecg.Replicant('assets:mainSponsor')
const data_ath = nodecg.Replicant('assets:dataAth')

// Fichiers de configuraiton
const dataConfigCC = nodecg.Replicant('dataConfigCC')
const dataConfig = nodecg.Replicant('dataConfig')

// Destructuration du fichier static
const eventInfos = nodecg.Replicant('eventInfos');
const heatInfos = nodecg.Replicant('heatInfos');
const workoutInfo = nodecg.Replicant('workoutInfo');
const s_athletes = nodecg.Replicant('s_athletes');
//! A supprimer
// const Statics = nodecg.Replicant('statics');


// Destructuration du fichier Dynamic
const statusHeat = nodecg.Replicant('status');
const d_athletes = nodecg.Replicant('d_athletes');

//! À supprimer
// const Dynamics = nodecg.Replicant('dynamics');


const ParticipantsWod = nodecg.Replicant('ParticipantsWod');
const DatesEvent = nodecg.Replicant('DatesEvent');
const WodTab = nodecg.Replicant('WodTab');
const WarmUpTab = nodecg.Replicant('WarmUpTab');
const WorkoutInfos = nodecg.Replicant('WorkoutInfos');


const LogoImg = nodecg.Replicant('LogoImg')
const sponsorWod = nodecg.Replicant('sponsorWod')


// Data from Competition Corner
const affiliateStats = nodecg.Replicant('affiliateStats')
const Divisions = nodecg.Replicant('Divisions')
const eventId = nodecg.Replicant('eventId', { defaultValue: 0, persistent:false})
const TopScore = nodecg.Replicant('TopScore')

const listeAthlete = nodecg.Replicant('listeAthlete')


// State Connection Replicant
const Connected = nodecg.Replicant('Connected', { defaultValue: false, persistent:false});