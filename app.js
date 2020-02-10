
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listen for a slash command invocation
app.command('/recipe', ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();

  try {
    const result = app.client.views.open({
      token: context.botToken,
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: payload.trigger_id,
      // View payload
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Add a new recipe'
        },
        blocks: [
          {
            "type": "divider"
          },
          {
            "type": "input",
            "block_id": "recipe_title",
            "element": {
              "type": "plain_text_input",
              "action_id": "recipe-title-input",
              "placeholder": {
                "type": "plain_text",
                "text": "Enter a recipe title",
                "emoji": true
              }
            },
            "label": {
              "type": "plain_text",
              "text": "Title"
            }
          },
          {
            "type": "input",
            "block_id": "recipe_url",
            "element": {
              "type": "plain_text_input",
              "action_id": "recipe-url-input",
              "placeholder": {
                "type": "plain_text",
                "text": "URL to the recipe",
                "emoji": true
              }
            },
            "label": {
              "type": "plain_text",
              "text": "Url"
            }
          },
          {
            "type": "input",
            "block_id": "recipe_category",
            "element": {
              "type": "static_select",
              "action_id": "recipe-category-input",
              "placeholder": {
                "type": "plain_text",
                "text": "Select a category",
                "emoji": true
              },
              "options": [
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Breakfast",
                    "emoji": true
                  },
                  "value": "Breakfast"
                },
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Dessert",
                    "emoji": true
                  },
                  "value": "Dessert"
                },
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Main",
                    "emoji": true
                  },
                  "value": "Main"
                },
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Pasta",
                    "emoji": true
                  },
                  "value": "Pasta"
                },
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Salad",
                    "emoji": true
                  },
                  "value": "Salad"
                }
              ]
            },
            "label": {
              "type": "plain_text",
              "text": "Category",
              "emoji": true
            }
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

// Handle a view_submission event
app.view('view_1', async ({ ack, body, view, context }) => {
  // Acknowledge the view_submission event
  ack();

  // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

  // Assume there's an input block with `block_1` as the block_id and `input_a`
  const title = view['state']['values']['recipe_title']['recipe-title-input']['value'];
  const url = view['state']['values']['recipe_url']['recipe-url-input']['value'];
  const category = view['state']['values']['recipe_category']['recipe-category-input']['selected_option']['value'];
  const user = body['user']['id'];

  // Message to send user
  let msg = '';
  // Save to DB
  // const results = await db.set(user.input, val);
  msg = 'added: ' + title + '; ' + url + '; ' + category;

  // Message the user
  try {
    app.client.chat.postMessage({
      token: context.botToken,
      channel: '#recipes',
      text: msg
    });
  }
  catch (error) {
    console.error(error);
  }

});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt Recipe app is running!');
})();

