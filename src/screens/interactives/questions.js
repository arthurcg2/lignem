export default questions = [
	{
		id: 1,
		char: 'pop',
		statement:
			'Queremos mais fontes limpas de energia, a poluição está nos incomodando! Coloque mais painéis solares na nossa região!',
		yesOption: 'Tudo bem',
		noOption: 'Não',
		yes: [2, 2, -4, 2],
		no: [-2, -4, 2, -2],
	},
	{
		id: 2,
		char: 'rob',
		statement:
			'Eu acho que deveríamos construir uma hidrelétrica no Rio Elma, que fica na planície de São Pedro, o que senhor acha?',
		yesOption: 'Construa',
		noOption: 'Não construa',
		yes: [-2, -2, -4, 1],
		no: [2, 2, 0, -1],
	},
	{
		id: 3,
		char: 'car',
		statement:
			'Poderíamos vender um pouco da nossa terra para investidores estrangeiros!',
		yesOption: 'Claro!',
		noOption: 'Nunca!',
		yes: [-4, -2, 4, 0],
		no: [4, 2, -3, 0],
	},
	{
		id: 4,
		char: 'jon',
		statement:
			'Recebemos uma proposta de doação de certo valor para a construção de um parque eólico no Mar Olimpo, o senhor deveria aceitar!',
		yesOption: 'Aceito',
		noOption: 'Não aceito',
		yes: [2, 2, 0, 4],
		no: [-1, -2, 0, -2],
	},
	{
		id: 5,
		char: 'rob',
		statement:
			'Os outros países estão optando por usinas termoelétricas, o combustível é muito barato! Vamos colocar uma no nosso país!',
		yesOption: 'Tudo bem',
		noOption: 'Não',
		yes: [-4, -2, -2, 4],
		no: [2, 2, 0, -2],
	},
	{
		id: 6,
		char: 'jon',
		statement:
			'Percebemos que a usina maremotriz de Santo Antônio está precisando de manutenção, o senhor poderia financiar o procedimento?',
		yesOption: 'Claro!',
		noOption: 'Se está funcionando, está ótimo...',
		yes: [2, 0, -2, 2],
		no: [-1, 0, 1, -2],
	},
	{
		id: 7,
		char: 'pop',
		statement:
			'A usina nuclear de São Bento está nos incomodando! Não vamos mais aguentar tanta poluição, por favor, retire ela!',
		yesOption: 'Vou retirar',
		noOption: 'Eu estou achando ótimo...',
		yes: [2, 2, -2, -4],
		no: [-1, -4, 2, 2],
	},
];
