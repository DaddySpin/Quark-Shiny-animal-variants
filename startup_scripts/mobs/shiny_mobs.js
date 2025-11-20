global.shiny_entities = [
	"minecraft:chicken",
    "minecraft:cow",
    "minecraft:dolphin",
	"minecraft:llama",
    "minecraft:pig",
    "minecraft:rabbit",
    "minecraft:slime",
]

EntityJSEvents.modifyEntity(event => {
	for (let mob of global.shiny_entities) {
		event.modify(mob, builder => {
			builder.defineSyncedData(entity => {
				let mob_id = entity.type.split(":")[1]
				entity.addSyncedData("string", "shiny", "not_shiny")
			})
			builder.setTextureLocation(context => global.texture(context))
		})
	}
})

global.texture = context => {
	for (let mob of global.shiny_entities) {
		let { entity } = context
		let mob_id = entity.type.split(":")[1]
		if (entity.getSyncedData("shiny") == `${mob_id}`) {
			return `kubejs:textures/model/entity/variants/${mob_id}_shiny.png`
		}
		return null
	}
}