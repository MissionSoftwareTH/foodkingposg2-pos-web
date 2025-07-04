import { AbilityBuilder, createMongoAbility, type Ability } from "@casl/ability";

export const ability: Ability = createMongoAbility();

export const updateAbility = (userRoles: string, userId?: string) => {
    const { can , rules } = new AbilityBuilder(createMongoAbility);

    if (userRoles.includes('Super Admin')) {
        can('manage', 'all');
    }

    if (userRoles.includes('editor')) {
        can('read', 'Post');
        can('create', 'Post');
        if (userId) {
            can('update', 'Post', { authorId: userId });
        }
    }

    if (userRoles.includes('viewer')) {
        can('read', 'Post');
        can('read', 'Comment');
    }

    ability.update(rules);
}

export const resetAbility = () => {
    ability.update([]);
}
