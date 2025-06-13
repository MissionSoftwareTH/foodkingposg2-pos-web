import { AbilityBuilder, createMongoAbility, type Ability } from "@casl/ability";
import type { getAbility } from "../../types";

export const ability: Ability = createMongoAbility();

export const updateAbility = (userRoles: getAbility[], userId?: string) => {
    const { can , rules } = new AbilityBuilder(createMongoAbility);
    const role:string[] = [];
    
    userRoles.forEach((r) => {
        role.push(r.RoleName);
    })

    if (role.includes('Super Admin')) {
        can('manage', 'all');
    }

    if (role.includes('editor')) {
        can('read', 'Post');
        can('create', 'Post');
        if (userId) {
            can('update', 'Post', { authorId: userId });
        }
    }

    if (role.includes('viewer')) {
        can('read', 'Post');
        can('read', 'Comment');
    }

    ability.update(rules);
}

export const resetAbility = () => {
    ability.update([]);
}
