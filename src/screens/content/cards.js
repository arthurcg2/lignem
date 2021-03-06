function compare(a, b) {
	if (a.title < b.title) {
		return -1;
	}
	if (a.title > b.title) {
		return 1;
	}
	return 0;
}

export default [
	{
		id: 1,
		title: 'Energia Hidrelétrica',
		image: require('../../../assets/hidreletrica.jpg'),
		description:
			'As usinas hidrelétricas: suas características, detalhes e funcionamento!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'hidreletrica',
			contentPageTitle: 'Energia Hidrelétrica',
		},
	},
	{
		id: 2,
		title: 'Energia Solar',
		image: require('../../../assets/painel-solar.jpg'),
		description:
			'A energia solar: sua definição, funcionamento e suas características!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'solar',
			contentPageTitle: 'Energia Solar',
		},
	},
	{
		id: 3,
		title: 'Energia Maremotriz',
		image: require('../../../assets/maremotriz.jpg'),
		description:
			'A energia maremotriz: sua definição, funcionamento e suas características!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'maremotriz',
			contentPageTitle: 'Energia Maremotriz',
		},
	},
	{
		id: 4,
		title: 'Energia Eólica',
		image: require('../../../assets/eolica-card.jpg'),
		description:
			'A energia eólica: sua definição, funcionamento e suas características!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'eolica',
			contentPageTitle: 'Energia Eólica',
		},
	},
	{
		id: 5,
		title: 'Eficiência Energética',
		image: require('../../../assets/eficiencia-energetica.jpg'),
		description:
			'A eficiência energética: sua definição, como alcançar e dicas!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'eficienciaEnergetica',
			contentPageTitle: 'Eficiência Energética',
		},
	},
	{
		id: 6,
		title: 'Energia Termoelétrica',
		image: require('../../../assets/termo-eletrica.jpg'),
		description:
			'A energia termelétrica: sua definição, funcionamento e suas características!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'termoeletrica',
			contentPageTitle: 'A Energia Termoelétrica',
		},
	},
	{
		id: 7,
		title: 'Energia Nuclear',
		image: require('../../../assets/nuclear-energica.jpg'),
		description:
			'A energia nuclear: sua definição, funcionamento e suas características!',
		buttonTitle: 'Ir para a página!',
		targetPageSettings: {
			contentJSONName: 'nuclear',
			contentPageTitle: 'Energia Nuclear',
		},
	},
].sort(compare);
