import { Generator } from '../interfaces';

class RandIntGenerator implements Generator {
	private static readonly FIELD_TO_POPULATE: string = 'fieldToPopulate';
	private static readonly MIN: string = 'min';
	private static readonly MAX: string = 'max';
	
	private name: String = '';
	private fieldToPopulate: string = '';
	private min: number = 0;
	private max: number = 0;
	
	initialise(name: String, config: { [key: string]: any }): void {
		this.name = this.validateName(name);
		this.validateConfig(config);
		this.fieldToPopulate = config['fieldToPopulate'];
		this.min = config[RandIntGenerator.MIN];
		this.max = config[RandIntGenerator.MAX];
	}

	next(_historical: Object[]): Object {
		const randomNumber = Math.random();
		var scaledNumber = randomNumber * (this.max - this.min) + this.min;
		const retObject = {
			[this.fieldToPopulate]: scaledNumber
		};
		return retObject;
	}
	
	public getName(): String {
        return this.name;
    }
	
	// TODO PB: extract to a utils class?
	private validateName(name: String | null): String {
		if (name === null || name.trim() === '') {
			// TODO PB - custom / more specific error?
			throw new Error('name is empty or null');
		}
		return name;
	}
	
	// TODO PB: extract to a utils class?
	private validateConfig(config: { [key: string]: any }): void {
		if (!config.hasOwnProperty(RandIntGenerator.FIELD_TO_POPULATE)) {
			// TODO PB - custom / more specific error?
			throw new Error('config is missing ' + RandIntGenerator.FIELD_TO_POPULATE);
		}
		if (!config.hasOwnProperty(RandIntGenerator.MIN)) {
			// TODO PB - custom / more specific error?
			throw new Error('config is missing ' + RandIntGenerator.MIN);
		}
		if (!config.hasOwnProperty(RandIntGenerator.MAX)) {
			// TODO PB - custom / more specific error?
			throw new Error('config is missing ' + RandIntGenerator.MAX);
		}
	}
}

export default RandIntGenerator;