
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
const dataConfig = nodecg.Replicant('dataConfig')

// Destructuration du fichier static
const eventInfos = nodecg.Replicant('eventInfos');
const heatInfos = nodecg.Replicant('heatInfos');
const workoutInfo = nodecg.Replicant('workoutInfo');
const s_athletes = nodecg.Replicant('s_athletes');


// Destructuration du fichier Dynamic
const statusHeat = nodecg.Replicant('status');
const d_athletes = nodecg.Replicant('d_athletes');


// Data from Competition Corner
const affiliateStats = nodecg.Replicant('affiliateStats')
const Divisions = nodecg.Replicant('Divisions')
const WorkoutInfos = nodecg.Replicant('WorkoutInfos');
const listWarmpUp = nodecg.Replicant('listWarmpUp');

const TopScore = nodecg.Replicant('TopScore')

// Competition Corner braodcast
const AttributionLane = nodecg.Replicant('AttributionLane');
const HeatResults = nodecg.Replicant('HeatResults')
const OSDivisionWorkout = nodecg.Replicant('OSDivisionWorkout')
const listCis = nodecg.Replicant('CIS', { defaultValue: {}, persistent: true })


// State Connection Replicant
const Connected = nodecg.Replicant('Connected');

// Value from MQTT Kairos
// const divisionMQTT = nodecg.Replicant('divisionMQTT')
const workoutsMQTT = nodecg.Replicant('workoutsMQTT')
const heatMQTT = nodecg.Replicant('heatMQTT')