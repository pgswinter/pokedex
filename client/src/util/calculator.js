import happy from '../images/happy.png';

export const setDmg = (data) => {
    let total = 0;
    data.forEach((item, i) => {
        total += item.damage
    });
    return total;
}

export const setHappy = (attacks, weaknesses, hp) => {
    let dmg = 0;
    let weak = 0;
    attacks.forEach((item, i) => {
        dmg += item.damage;
    });
    weak = weaknesses.length >= 2 ? 100 : (weaknesses.length === 1 ? 50 : 0)
    
    const happy = Math.round(((hp / 10) + (dmg / 10) + 10 - (weak/100)) / 5);
    return happy;
}

export const renderHappy = (happyCount) => {
    const happyArr = [];
    for (let index = 0; index < happyCount; index++) {
        happyArr.push(happy)
    }
    return happyArr;
}