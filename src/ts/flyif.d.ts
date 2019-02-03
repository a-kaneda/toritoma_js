import CharacterIF from './characterif';

/**
 * ハエインターフェース。
 */
interface FlyIF extends CharacterIF {

    /** ウジの数 */
    maggotCount: number;
}

export default FlyIF;