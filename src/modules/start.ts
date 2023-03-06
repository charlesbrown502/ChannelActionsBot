import { MyContext } from "../core/types.ts";
import { addUser } from "../database/usersDb.ts";

import { Composer, InlineKeyboard } from "grammy/mod.ts";

const composer = new Composer<MyContext>();

composer
  .command("start", async (ctx) => {
    if (ctx.chat.type != "private") return;
    await ctx.reply(ctx.t("start-msg", { user: ctx.from!.first_name }), {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard()
        .url("➕ Add Me To Your Channel ➕", `https://t.me/${ctx.me.username}?startchannel=true&admin=invite_users+manage_chat`).row()
        .url("➕ Add Me To Your Group ➕", `https://t.me/${ctx.me.username}?startgroup=true&admin=invite_users+manage_chat`).row()
        .url("📢 Updates Channel", "https://t.me/LinuxBotz"),
      disable_web_page_preview: true,
    });
    await addUser(ctx.from!.id);
  });

composer.callbackQuery("mainMenu", async (ctx) => {
  await ctx.editMessageText(
    ctx.t("start-msg", { user: ctx.from!.first_name }),
    {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard()
        .url("➕ Add Me To Your Channel ➕", "https://t.me/ChatActionBot?startchannel=true")
        .url("➕ Add Me To Your Group ➕", "https://t.me/ChatActionBot?startgroup=true").row()
        .url(ctx.t("updates"), "https://t.me/BotzHub"),
      disable_web_page_preview: true,
    },
  );
});

export default composer;
