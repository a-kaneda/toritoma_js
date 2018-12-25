import Dragonfly from './dragonfly';
import Ant from './ant';
import Butterfly from './butterfly';
import Ladybug from './ladybug';
import Bagworm from './bagworm';
import Cicada from './cicada';
import Grasshopper from './grasshopper';
import Hornet from './hornet';
import Snail from './snail';
import RhinocerosBeetle from './rhinocerosbeetle';
import Mantis from './mantis';
import Hoenycomb from './honeycomb';
import Spider from './spider';
import Centipede from './centipede';
import CentipedeBody from './centipedebody';
import CentipedeTail from './centipedetail';
import DeathNormal from './deathnormal';
import DeathBoss from './deathboss';
import DeathCentipede from './deathcentipede';
import DeathNone from './deathnone';
// 敵撃破時のチキンゲージ増加量
const INCREMENT_CHICKEN_GAUGE = 0.005;
/**
 * 敵キャラパラメータ定義。
 */
const ENEMY_DEF = {
    // トンボ
    dragonfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 3,
        defense: 0,
        score: 100,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // アリ
    ant: {
        size: 16,
        width: 16,
        height: 8,
        hp: 7,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // チョウ
    butterfly: {
        size: 16,
        width: 16,
        height: 16,
        hp: 10,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // テントウムシ
    ladybug: {
        size: 16,
        width: 16,
        height: 16,
        hp: 18,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // ミノムシ
    bagworm: {
        size: 16,
        width: 16,
        height: 16,
        hp: 30,
        defense: 0,
        score: 300,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // セミ
    cicada: {
        size: 16,
        width: 16,
        height: 16,
        hp: 20,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // バッタ
    grasshopper: {
        size: 16,
        width: 16,
        height: 16,
        hp: 9,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // ハチ
    hornet: {
        size: 16,
        width: 16,
        height: 16,
        hp: 12,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // カタツムリ
    snail: {
        size: 16,
        width: 16,
        height: 16,
        hp: 13,
        defense: 0,
        score: 200,
        death: 'DeathNormal',
        originX: 0.5,
        originY: 0.5,
    },
    // カブトムシ
    rhinocerosbeetle: {
        size: 64,
        width: 32,
        height: 20,
        hp: 2000,
        defense: 0,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // カマキリ
    mantis: {
        size: 64,
        width: 32,
        height: 32,
        hp: 2600,
        defense: 99,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // ハチの巣
    honeycomb: {
        size: 64,
        width: 32,
        height: 32,
        hp: 2400,
        defense: 99,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // クモ
    spider: {
        size: 64,
        width: 32,
        height: 32,
        hp: 3200,
        defense: 0,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.5,
        originY: 0.5,
    },
    // ムカデ
    centipede: {
        size: 32,
        width: 16,
        height: 16,
        hp: 19,
        defense: 99,
        score: 3000,
        death: 'DeathBoss',
        originX: 0.25,
        originY: 0.5,
    },
    // ムカデ（胴体）
    centipede_body: {
        size: 32,
        width: 16,
        height: 8,
        hp: 1,
        defense: 99,
        score: 0,
        death: 'DeathNone',
        originX: 0.5,
        originY: 0.5,
    },
    // ムカデ（尻尾）
    centipede_tail: {
        size: 32,
        width: 24,
        height: 24,
        hp: 15,
        defense: 0,
        score: 0,
        death: 'DeathCentipede',
        originX: 0.75,
        originY: 0.5,
    },
};
class EnemyFactory {
    static create(x, y, type, scene) {
        // 敵キャラクターを作成する。
        let enemy = null;
        switch (type) {
            case 'dragonfly':
                enemy = new Dragonfly(x, y, ENEMY_DEF[type], scene);
                break;
            case 'ant':
                enemy = new Ant(x, y, ENEMY_DEF[type], scene);
                break;
            case 'butterfly':
                enemy = new Butterfly(x, y, ENEMY_DEF[type], scene);
                break;
            case 'ladybug':
                enemy = new Ladybug(x, y, ENEMY_DEF[type], scene);
                break;
            case 'bagworm':
                enemy = new Bagworm(x, y, ENEMY_DEF[type], scene);
                break;
            case 'cicada':
                enemy = new Cicada(x, y, ENEMY_DEF[type], scene);
                break;
            case 'grasshopper':
                enemy = new Grasshopper(x, y, ENEMY_DEF[type], scene);
                break;
            case 'hornet':
                enemy = new Hornet(x, y, ENEMY_DEF[type], scene);
                break;
            case 'snail':
                enemy = new Snail(x, y, ENEMY_DEF[type], scene);
                break;
            case 'rhinocerosbeetle':
                enemy = new RhinocerosBeetle(x, y, ENEMY_DEF[type], scene);
                break;
            case 'mantis':
                enemy = new Mantis(x, y, ENEMY_DEF[type], scene);
                break;
            case 'honeycomb':
                enemy = new Hoenycomb(x, y, ENEMY_DEF[type], scene);
                break;
            case 'spider':
                enemy = new Spider(x, y, ENEMY_DEF[type], scene);
                break;
            case 'centipede':
                enemy = new Centipede(x, y, ENEMY_DEF[type], scene);
                break;
            case 'centipede_body':
                enemy = new CentipedeBody(x, y, ENEMY_DEF[type], scene);
                break;
            case 'centipede_tail':
                enemy = new CentipedeTail(x, y, ENEMY_DEF[type], scene);
                break;
            default:
                console.log(`Error: Unknwon enemy type: ${type}`);
                break;
        }
        if (enemy) {
            // 死亡エフェクトを作成する。
            let death;
            switch (ENEMY_DEF[type].death) {
                case 'DeathNormal':
                    death = new DeathNormal(enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                case 'DeathBoss':
                    death = new DeathBoss(enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                case 'DeathCentipede':
                    death = new DeathCentipede(enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
                default:
                    death = new DeathNone(enemy, ENEMY_DEF[type].score, INCREMENT_CHICKEN_GAUGE);
                    break;
            }
            enemy.deathEffect = death;
        }
        return enemy;
    }
}
export default EnemyFactory;
