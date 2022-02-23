addLayer("ach", {
    name:"achievements",
    symbol: "A",
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#ADFF2F",
    resource: "Achievements",
    row: "side",
    tabFormat: [["display-text",
    function() { return '<h2>Achievements</h2>' }], "main-display", "achievements"],
    achievements: {
        11: {
            name: "Start game",
            done() {return player.zero.points.gte("1")},
            goalTooltip: "Gain 1 zero.",
            doneTooltip: "Gain 1 zero (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        12: {
            name: "1 Row Done.",
            done() {return new Decimal (player.zero.upgrades.length).gte("5")},
            goalTooltip: "Bought 5 upgrades in the first layer. Reward: Unlock a new Row of upgrades.",
            doneTooltip: "Bought 5 upgrades in the first layer. Reward: Unlock a new Row of upgrades. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        13: {
            name: "Nice...",
            done() {return new Decimal (player.points).gte("69420")},
            goalTooltip: "Reach 69,420 Points.",
            doneTooltip: "Reach 69,420 Points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        14: {
            name: "Buyable!",
            done() {return new Decimal (getBuyableAmount('zero', 11)).gte("5")},
            goalTooltip: "Buy 5 Point buyable with 8 zero upgrades. Reward: Unlock a new upgrade.",
            doneTooltip: "Buy 5 Point buyable with 8 zero upgrades. Reward: Unlock a new upgrade. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        15: {
            name: "2 Rows Done..",
            done() {return new Decimal (player.zero.upgrades.length).gte("10")},
            goalTooltip: "Bought 10 upgrades in the first layer.",
            doneTooltip: "Bought 10 upgrades in the first layer.(Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        21: {
            name: "Bored with the Buyable now?",
            done() {return (new Decimal (player.zero.upgrades.length).gte("10") && getBuyableAmount('zero', 11) >= 10)},
            goalTooltip: "Buy 10 Point Buyables with 10 zero upgrades. Reward: Unlock a new Row of upgrades.",
            doneTooltip: "Buy 10 Point Buyables with 10 zero upgrades. Reward: Unlock a new Row of upgrades. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        22: {
            name: "Nice^2",
            done() {return new Decimal (player.points).gte("4819136400")},
            effect() {
                let base = new Decimal(12.5)
                let basemult = new Decimal (1)
                let baseexpo = new Decimal (1)
                let eff = (Decimal.pow(base.mul(basemult), baseexpo))
                return eff
            },
            goalTooltip: "Reach 69,420^2 or about 4.82e9 points. Reward: Gain 12.5% more zeros",
            doneTooltip: "Reach 69,420^2 or about 4.82e9 points. Reward: Gain 12.5% more zeros (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        23: {
            name: "Too Much Buyable",
            done() {return (new Decimal (player.zero.upgrades.length).gte("13") && getBuyableAmount('zero', 11) >= 15)},
            goalTooltip: "Buy 15 Point Buyables with 13 zero upgrades. Reward: Unlock a upgrade.",
            doneTooltip: "Buy 15 Point Buyables with 13 zero upgrades. Reward: Unlock a upgrades. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        24: {
            name: "1e10 zeros is a lot",
            done() {return new Decimal (player.zero.total).gte("1e10")},
            goalTooltip: "Gain a total 1e10 zeros.",
            doneTooltip: "Gain a total 1e10 zeros. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        25: {
            name: "3 Row Done...",
            done() {return new Decimal (player.zero.upgrades.length).gte("15")},
            goalTooltip: "Bought 15 upgrades in the first layer.",
            doneTooltip: "Bought 15 upgrades in the first layer. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        31: {
            name: "Finally a new Layer!",
            unlocked() {return player.one.points.gte("1")},
            done() {return new Decimal (player.one.points).gte("1")},
            goalTooltip: "Gain 1 one.",
            doneTooltip: "Gain 1 one. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        32: {
            name: "Endgame of V0.1",
            unlocked() {return player.one.points.gte("1")},
            done() {return new Decimal (player.one.points).gte("3")},
            goalTooltip: "Gain 3 ones.",
            doneTooltip: "Gain 3 ones. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
    }
})
addLayer("zero", {
    name: "zero", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal (0),
    }},
    color: "#808080",
    requires: new Decimal (10), // Can be a function that takes requirement increases into account
    resource: "zeros", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('zero', 14)) mult = mult.times(upgradeEffect('zero', 14))
        if(hasUpgrade('zero', 21)) mult = mult.times(upgradeEffect('zero', 21))
        if(hasUpgrade('zero', 25)) mult = mult.times(upgradeEffect('zero', 25))
        if(hasUpgrade('zero', 31)) mult = mult.times(upgradeEffect('zero', 31))
        if(hasUpgrade('zero', 35)) mult = mult.times(upgradeEffect('zero', 35))
        if (hasAchievement('ach', 21)) mult = mult.times(new Decimal (112.5).div(100))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Double fun",
            description: "Double your point gain.",
            cost: new Decimal (1),
            effect() {
                let base = new Decimal (2)
                if(hasUpgrade('zero', 34)) base = base.add(upgradeEffect('zero', 34))
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        12: {
            title: "Zero Boost?",
            description: "Boost point gain based on zeros.",
            cost: new Decimal (2),
            unlocked() {
                return hasUpgrade('zero', 11)
            },
            effect() {
                let base = player.zero.points.add(2)
                let expo = new Decimal (0.4)
                let eff = base.pow(expo)
                if(hasUpgrade('zero', 32)) eff = eff.times(upgradeEffect('zero', 32))
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        13: {
            title: "Pointed generation",
            description: "Boost point gain based on points.",
            cost: new Decimal (5),
            unlocked() {
                return hasUpgrade('zero', 12)
            },
            effect() {
                let base = player.points.add(1)
                let log = new Decimal(10)
                let expo = new Decimal (0.6)
                let eff = base.log(log).add(1).pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        14: {
            title: "Reversed Boost",
            description: "Boost zeros gain based on points.",
            cost: new Decimal (20),
            unlocked() {
                return hasUpgrade('zero', 13)
            },
            effect() {
                let base = player.points.add(1)
                let log = new Decimal(10)
                let expo = new Decimal (0.45)
                let eff = base.log(log).add(1).pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        15: {
            title: "Upgrader",
            description: "Boost point gain based on bought zeros upgrades.",
            cost: new Decimal (75),
            unlocked() {
                return hasUpgrade('zero', 14)
            },
            effect() {
                let base = new Decimal (player.zero.upgrades.length).add(2)
                let expo = new Decimal (1.25)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        21: {
            title: "Self Boost",
            description: "Boost zeros gain based on zeros.",
            cost: new Decimal (250),
            unlocked() {
                return hasUpgrade('zero', 15)
            },
            effect() {
                let base = player.zero.points.add(2)
                let expo = new Decimal (0.24)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        22: {
            title: "Time Boost",
            description: "Boost point gain based on time played.",
            cost: new Decimal (1250),
            unlocked() {
                return hasUpgrade('zero', 21)
            },
            effect() {
                let base = new Decimal (player.timePlayed).div(300).add(1)
                let expo = new Decimal (0.25)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        23: {
            title: "Buyable",
            description: "Unlock a buyable.",
            cost: new Decimal (5e3),
            unlocked() {
                return hasUpgrade('zero', 22)
            },
        },
        24: {
            title: "Base Increaser",
            description: "Boost point gain base by 1.5",
            cost: new Decimal (5e4),
            unlocked() {
                return (hasUpgrade('zero', 23) && hasAchievement('ach', 14))
            },
            effect() {
                let base = new Decimal (1.5)
                if(hasUpgrade('zero', 33)) base = base.add(upgradeEffect('zero', 33))
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        },
        25: {
            title: "More!",
            description: "Gain 10% more zeros.",
            cost: new Decimal (2.5e5),
            unlocked() {
                return hasUpgrade('zero', 24)
            },
            effect() {
                let base = new Decimal (0.1)
                let expo = new Decimal (1)
                let eff = base.pow(expo).add(1)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        31: {
            title: "Achievement Boost!",
            description: "Gain more zeros based on completed achievements.",
            cost: new Decimal (1e7),
            unlocked() {
                return (hasUpgrade('zero', 25) && hasAchievement('ach', 21))
            },
            effect() {
                let base = player.ach.points.add(2)
                let expo = new Decimal (0.6)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        32: {
            title: "Self Zero Boost",
            description: "Zero Boost? effect is boosted based on itself.",
            cost: new Decimal (2.56e7),
            unlocked() {
                return hasUpgrade('zero', 31)
            },
            effect() {
                let base = new Decimal(upgradeEffect(this.layer, 12))
                let log = new Decimal(10)
                let expo = new Decimal (0.125)
                let eff = base.log(log).pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        33: {
            title: "Base Base Increaser",
            description: "Base Increaser Base is boosted based on your logarithm of zero.",
            cost: new Decimal (1.25e8),
            unlocked() {
                return hasUpgrade('zero', 32)
            },
            effect() {
                let base = player[this.layer].points.add(1).log(10).add(1)
                let expo = new Decimal (0.32)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        },
        34: {
            title: "Upgrader II",
            description: "Double fun base is boosted based on bought zero upgrades.",
            cost: new Decimal (1e9),
            unlocked() {
                return (hasUpgrade('zero', 33) && hasAchievement('ach', 23))
            },
            effect() {
                let base = new Decimal (player.zero.upgrades.length).add(2)
                let expo = new Decimal (0.32)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        },
        35: {
            title: "New Layer?",
            description: "Gain 69% more zeros and Unlock a new layer.",
            cost: new Decimal (6e9),
            unlocked() {
                return hasUpgrade('zero', 34)
            },
            effect() {
                let base = new Decimal (69)
                let expo = new Decimal (1)
                let eff = base.pow(expo).add(100).div(100)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
    },
    buyables: {
        11: {
            title: "Point Buyable",
            unlocked() {
                return hasUpgrade('zero', 23)
            },
            cost(x) {
                return new Decimal(1e3).mul(Decimal.pow(2, x)).mul(Decimal.pow(1.25, Decimal.pow(x, 1.1)))
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " zeros" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost point gain by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(2.5)
                let base2 = x
                let expo = new Decimal(0.6)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
})
addLayer("one", {
    name: "one",
    symbol: "1",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#8c8173",
    requires: new Decimal(1e10),
    resource: "ones",
    baseResource: "zeros",
    baseAmount() {return player.zero.points},
    type: "normal",
    exponent: 1/(new Decimal(1e10).log(10)), // 1/10
    gainMult() {
        let mult = new Decimal (1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ['zero'],
    row: 1,
    layerShown(){return (hasUpgrade('zero', 35) || player.one.total.gte(1))},
    upgrades: {
        11: {
            title: "Triple Gain",
            description: "Triple your point gain.",
            cost: new Decimal (1),
            unlocked() {
                return player.one.total.gte(1)
            },
            effect() {
                let base = new Decimal (3)
                let expo = new Decimal (1)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
        12: {
            title: "A Boost",
            description: "Get it? Point gain is boosted based on ones.",
            cost: new Decimal (1),
            unlocked() {
                return hasUpgrade('one', 11)
            },
            effect() {
                let base = player.one.points.add(2)
                let expo = new Decimal (0.6)
                let eff = base.pow(expo)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            }
        },
    },
})