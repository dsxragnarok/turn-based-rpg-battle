[Unit]
   * name : string
   * health : number
   * attack : number
   * defense : number
   * speed : number
   * actions : list of [Action]

[Action]
   The base action class. Every action should derive from this class.

   * initialize : function - sets up the action.
   * actor : Unit - required, an action must have an actor.
   * [target] : Unit | Array - optional, the target can be a single unit or multiple units.
   * act : function - apply the action.

   Notes: an action should first be initialized with Action.initialize. To actually
          perform the action, it should be sufficient to invoke Action(any parameters);


[Status]
   * effect

[Turn]

[Grid]

[Group]

[Allies] [Ally]

[Foes] [Foe]

   Foes                 Allies
[ ] [ ] [ ]    |     [ ] [ ] [ ]
[ ] [ ] [ ]    |     [ ] [ ] [ ]
[ ] [ ] [ ]    |     [ ] [ ] [ ]
