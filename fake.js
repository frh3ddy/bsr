var names = [
	'Micha',  
	'Gertrude',  
	'Randa',  
	'Brandee',  
	'Bernardina',  
	'Karoline',  
	'Kathern',  
	'Maisie',  
	'Roseann',  
	'Larue',  
	'Sharonda',  
	'Marvel',  
	'Sana',  
	'Meryl',  
	'Evangelina',  
	'Ok',  
	'Meaghan',  
	'Ivana',  
	'Alina',  
	'Jc'  
];

var lastNames = [
	'Eartha',  
	'Sherilyn',
	'Isreal',  
	'Carlota',  
	'Lavonia',  
	'Glennis',  
	'Corinne',  
	'Graciela',  
	'Wilfredo',  
	'Loren',  
	'Jeramy',  
	'Jung',  
	'Helena',  
	'Teri',  
	'Lakita',  
	'Olivia',  
	'Chester',  
	'Debrah',  
	'Kit',  
	'Jeannette'
];

var phoneNumbers = [
	'202-555-0153',
	'202-555-0151',
	'202-555-0158',
	'202-555-0196',
	'202-555-0110',
	'202-555-0144',
	'202-555-0175',
	'202-555-0114',
	'202-555-0101',
	'202-555-0105',
	'202-555-0163',
	'202-555-0174',
	'406-555-0189',
	'406-555-0108',
	'406-555-0180',
	'406-555-0111',
	'406-555-0131',
	'406-555-0110'
]

function createName() {
	var firstName = names[Math.floor(Math.random()*names.length)];
	var lastName = lastNames[Math.floor(Math.random()*lastNames.length)];
	return firstName + ' ' + lastName;
}

function createNumber() {
	var phoneNumber = phoneNumbers[Math.floor(Math.random()*phoneNumbers.length)];
	return phoneNumber;
}

module.exports = {
	createName: createName,
	createNumber: createNumber
}



