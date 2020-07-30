var test = {
  test1(active, type, level) {
    let result;

    // TODO : Active Pages
    // NOTE : Page Practice (หน้าแบบฝึกหัด)
    if (active == "practice") {
      // TODO : Practice Type Talking
      // NOTE : Vocabulary : Review Vocab (หน้าทบทวนคำศัพท์)
      if (type == "review vocab") {
        switch (level) {
          case "0":
            result = "ทวนคำศัพท์หรอ น่าสนุกนะ รอสักครู่ กำลังจะเริ่มแล้ว...";
            break;
          case "1":
            result =
              "ลูกเรือทั้งหลายมารวมกันทวนคำศัพท์ที่เรียนมา พร้อมเสียงเพลงของข้าเถอะ";
            break;
          case "2":
            result =
              "พร้อมยัง พร้อมยัง มาทวนคำศัพท์ที่เรียนกัน รอรับคำสั่งจากกัปตันก่อนนะ";
            break;
          case "3":
            result = "เรามาทวนคำศัพท์กันเถอะ ต้องสนุกแน่ๆ เลย";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง...  คำศัพท์ก็เหมือนเพื่อน จำได้กี่คำกันนะ รอกัปตันก่อนนะ";
            break;
          case "5":
            result = "พวกนายจำคำศัพท์ที่ผ่านมาได้ไหมนะ ลองมาทบทวนกันเถอะ";
            break;
          case "6":
            result =
              "คำศัพท์ก็เหมือนมายากล ต้องฝึกซ้ำๆถึงจะเก่ง พร้อมรึยังล่ะ!!";
            break;
          case "7":
            result = "เธอๆ มาทวนคำศัพท์ที่ผ่านมากันเถอะ";
            break;
          case "8":
            result = "ตั้งใจทบทวนคำศัพท์ซะ ก่อนจะโดนไฟของข้า";
            break;
          case "9":
            result =
              "ทบทวนมันหน้าที่ของเธอ เธอก็ทำหน้าที่ของเธอไปสิ รอกัปตันสั่งแล้วกันนะ ";
            break;
          case "10":
            result = "พวกเจ้าเรียนได้แค่ไหน มาแสดงฝีมือให้ข้าดูสิ";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Vocabulary : Flashcard (หน้าการ์ดคำศัพท์)
      else if (type == "flashcard") {
        switch (level) {
          case "0":
            result =
              "น่าตื่นเต้นจังเลย!! จะได้เรียนคำศัพท์ใหม่แล้ว รอเดี๋ยวนะ เรากำลังจะเริ่มกันแล้ว";
            break;
          case "1":
            result =
              "ยิ่งรู้ศัพท์เยอะยิ่งร้องเพลงเก่งนะ รอสักครู่ คอนเสิร์ตจะเริ่มแล้ว ยู้วฮู้วว~";
            break;
          case "2":
            result =
              "ช้าจัง ช้าจัง เมื่อไหร่จะเริ่ม ข้ารออยู่นะ แคว๊ก!! แคว๊ก!!";
            break;
          case "3":
            result =
              "มันต้องสนุกแน่เลยเธอว่าไหม อดใจรอสักครู่นะ ฉันก็ตื่นเต้นเหมือนกัน";
            break;
          case "4":
            result = "โฮ่ง โฮ่ง~ คำศัพท์ใหม่มาแล้ว รอเรียนไปพร้อมกันเถอะ";
            break;
          case "5":
            result =
              "สหายทั้งหลายพร้อมเรียนรู้คำศัพท์ใหม่กันหรือยัง? รอฟังคำสั่งให้ดีล่ะ";
            break;
          case "6":
            result =
              "เหมียว~~ อยากเล่นมายากลหรอ ต้องรู้จักคำศัพท์ก่อนนะ เตรียมตัวรอได้เลย";
            break;
          case "7":
            result =
              "เราจะเรียนคำศัพท์ใหม่ไปพร้อมกัน รอก่อนนะ.. เดี๋ยวกัปตันจะบอกเธอเอง";
            break;
          case "8":
            result =
              "รอฟังคำสั่งให้ดีเจ้าพวกเด็กน้อย บทเรียนกำลังจะเริ่มแล้ว อย่าให้ข้าต้องพูดซ้ำ ฟู่~~";
            break;
          case "9":
            result =
              "บทเรียนกำลังจะเริ่ม จงเชื่อฟังคำสั่งกัปตันของเจ้า ก่อนที่ข้าจะสาปเจ้าเป็นกบ";
            break;
          case "10":
            result = "นั่งรอนิ่งๆ เข้าใจที่ข้าพูดใช่ไหม";
            break;

          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Vocabulary : Spelling bee (หน้าสะกดคำศัพท์)
      else if (type == "spelling bee") {
        switch (level) {
          case "0":
            result =
              "เรามาสะกดคำด้วยกันเถอะ ต้องใส่หูฟังรึเปล่านะ รอฟังคำสั่งกัปตันให้ดีล่ะ...";
            break;
          case "1":
            result =
              "อาจจะต้องใส่หูฟังด้วยละ ลองฟังที่กัปตันสั่งนะครับน้องๆ แล้วเรามาฝึกสะกดคำด้วยกัน";
            break;
          case "2":
            result =
              "พร้อมแล้ว ข้าพร้อมแล้ว รอรับคำสั่งจากกัปตันของเจ้าได้เลย แคว๊ก~ แคว๊ก~";
            break;
          case "3":
            result =
              "มาสนุกกับคำศัพท์กันเถอะ รอฟังสัญญาณจากกัปตันให้ดีนะ เธออาจจะได้ใส่หูฟังด้วย";
            break;
          case "4":
            result =
              "พร้อมจะฝึกสะกดคำกันรึยัง นั่งรอกัปตันสั่งได้เลย เราจะเริ่มกันแล้ว โฮ่ง โฮ่ง~~";
            break;
          case "5":
            result =
              "รอรับคำสั่งได้เลย...สหาย แล้วเรามาสะกดคำไปด้วยกัน ฮ่า ฮ่า...";
            break;
          case "6":
            result =
              "ระหว่างรอกัปตัน... มองที่หมวกข้าสิ... นี่ใช่หูฟังของเจ้ารึป่าว เจ้าอาจจะได้ใช้มันนะ เหมียว~";
            break;
          case "7":
            result =
              "กัปตันของเธออาจจะให้ใส่หูฟังก็ได้นะ รอคำสั่งก่อนสิ แล้วเรามาเริ่มฝึกสะกดคำด้วยกัน...";
            break;
          case "8":
            result =
              "ให้กัปตันของเจ้าเป็นคนสั่ง แล้วทำคะแนนให้ดี ไม่งั้นข้าจะพ่นไฟใส่เจ้า ฟู่~";
            break;
          case "9":
            result =
              "ไม่ยากเกินไปใช่ไหมคำศัพท์ที่เรียนมา นั่งรอกัปตันก่อน แล้วทำให้ดี...";
            break;
          case "10":
            result =
              "หึหึ... ต้องใส่หูฟังรึ..ให้กัปตันของเจ้าสั่งก่อนซิ นั่งรอนิ่งๆ เข้าใจไหม....";
            break;

          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Multiple Choices All Practice (หน้าเลือกคำศัพท์)
      else if (type == "multiplechoices") {
        switch (level) {
          case "0":
            result =
              "ได้เวลาแสดงฝีมือให้เห็นแล้ว เราลองใช้คำศัพท์ที่เรียนมากันเถอะ เธอสามารถกด <span class='bg3 br-a-sm color6 q-mx-md q-pa-xs q-pr-md shadow-3' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้ด้วยนะ";
            break;
          case "1":
            result =
              "ลั่นลันลา~ มาฝึกใช้คำศัพท์กันเถอะ น้องๆ สามารถกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้นะ ถ้ามันยากเกินไป ยู้วฮู้วว~";
            break;
          case "2":
            result =
              "แควก แคว่ก แคว๊ก!! ข้าพูดอะไรนะหรอ มาฝึกใช้คำศัพท์กับข้าสิ แคว๊ก!! เจ้าสามารถกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้ด้วยนะ";
            break;
          case "3":
            result =
              "มาลองดูกันว่าเธอจำคำศัพท์ที่เรียนมาได้หรือไม่ ถ้ายากเกินไปละก็.. ลองกดที่ <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> พร้อมนะ..";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~  มาฝึกใช้คำศัพท์กันเถอะ ถ้าเจ้าคิดว่ามันยาก ให้กด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> โฮ่ง~ โฮ่ง~";
            break;
          case "5":
            result =
              "สหาย... เจ้าพร้อมที่จะทดสอบคำศัพท์หรือยัง ถ้าเจ้าไม่ไหวละก็... กด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้นะ";
            break;
          case "6":
            result =
              "เหมียว~ ใครจะเก่งคำศัพท์กว่ากันนะ... ทำไม่ได้ลองกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ดูสิ";
            break;
          case "7":
            result =
              "แบบฝึกหัดนี้ไม่ยากหรอก เธอทำได้แน่ ถ้ามันยาก เธอลองกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ดูสิ";
            break;
          case "8":
            result =
              "หึหึ... คำศัพท์ง่ายๆ แค่นี้ มันคงไม่ยากเกินจนเจ้าทำไม่ได้สินะ ทำไมเจ้าไม่ลองกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ดูละ";
            break;
          case "9":
            result =
              "มาดูซิ ว่ารอบนี้เจ้าจะทำได้ดีแค่ไหน.. ข้าบอกได้แค่ว่าถ้ามันยาก ให้กดที่ <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span>";
            break;
          case "10":
            result =
              "หึหึ... คำศัพท์ง่ายๆ เจ้าพร้อมที่จะทำหรือยัง ยากไปรึ ทำไมไม่กดที่ <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span>";
            break;

          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Grammar : Review Grammar (หน้าทบทวนไวยากรณ์)
      else if (type == "review grammar") {
        switch (level) {
          case "0":
            result =
              "ฉันพร้อมแล้ว เธอพร้อมไหม กัปตันจะสั่งเริ่มแล้วนะ เรามาทบทวนไวยากรณ์กันเถอะ";
            break;
          case "1":
            result =
              "รอไม่รอ รอไม่รอ รออีกไม่นานนน รอก่อนนะน้องๆ เราจะมาทบทวนไวยากรณ์กัน";
            break;
          case "2":
            result =
              "วัดกัน วัดกัน เจ้ารู้จักไวยากรณ์จริงรึเปล่า รอสัญญาณจากกัปตันนะ แคว๊ก!! แคว๊ก!!";
            break;
          case "3":
            result =
              "มาลองดูกันว่าเธอจำสิ่งที่เรียนมาได้หรือไม่ รอสักครู่นะ เราจะมาทบทวนกัน";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ เจ้านั่งตรงนั้นนะ ข้านั่งตรงนี้ แล้วรอกัปตันสักเดี๋ยวเราจะเริ่มเรียนไปพร้อมกัน";
            break;
          case "5":
            result = "กัปตันยังไม่ทันสั่งเริ่มเลยนะเนี่ย อดใจรอก่อนสหาย..";
            break;
          case "6":
            result =
              "รอก่อนนะ ข้ากำลังจะเสกให้กัปตันสั่งเริ่มเดี๋ยวนี้ โอมมม... ชูครีม ไอศกรีม ไมโล เพี้ยง......";
            break;
          case "7":
            result = "เอ่อ.. ช่วยรอก่อนได้ไหม อีกแป๊บนึงนะ";
            break;
          case "8":
            result =
              "เรากำลังจะทบทวนไวยากรณ์ ข้าก็นั่งรอเหมือนกับเจ้า รออีกเดี๋ยวไม่ได้รึไง..";
            break;
          case "9":
            result =
              "ข้าไม่อยากจะบอกว่าเราต้องทำอะไรหรอกนะ จงรอกัปตันของเจ้าเถอะ";
            break;
          case "10":
            result = "ข้าไม่ค่อยชอบรอ เจ้าอยากให้ข้ารอเป็นเพื่อนเจ้าหรอ...";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Grammar : Grammar Lesson (สอนไวยากรณ์)
      else if (type == "grammarlesson") {
        switch (level) {
          case "0":
            result =
              "เราจะเริ่มเรียนไวยากรณ์กันแล้ว ตั้งใจฟังคำอธิบายนะ อย่าพลาดเชียวล่ะ..";
            break;
          case "1":
            result =
              "บทเรียนไวยากรณ์จะเริ่มแล้ว คำอธิบายเป็นสิ่งสำคัญนะ ตั้งใจฟังให้ดีล่ะ";
            break;
          case "2":
            result =
              "เจ้าคงไม่อยากเรียนแบบไม่รู้เรื่องสินะ แคว๊ก!! แคว๊ก!! แบบนั้นเจ้าต้องตั้งใจฟังคำอธิบายแล้วล่ะ";
            break;
          case "3":
            result =
              "เธอต้องตั้งใจฟังคำอธิบายให้ดี แล้วเธอจะผ่านบทเรียนนี้ไปได้ไม่ยาก";
            break;
          case "4":
            result =
              "โฮ่ง ตั้งใจฟังคำอธิบายนะ โฮ่ง โฮ่ง~ กัปตันของเจ้าจะอธิบายเนื้อหาของบทเรียนนี้ให้เจ้าฟัง";
            break;
          case "5":
            result =
              "ฮ่า ฮ่า เอาล่ะสหายของข้า คำอธิบายต่อไปนี้จะทำให้เจ้าเข้าใจบทเรียนมากขึ้น เจ้าต้องตั้งใจฟังให้มากล่ะ";
            break;
          case "6":
            result =
              "มายกลในวันนี้คือ.. อยากรู้หรอ เหมียว~ ตั้งใจฟังกัปตันอธิบายเนื้อหาวันนี้ก่อนสิ เหมียว~";
            break;
          case "7":
            result =
              "เอ่อ... เธอจะตั้งใจฟังที่กัปตันอธิบายอยู่ใช่ไหม ฉันมั่นใจแบบนั้นนะ ";
            break;
          case "8":
            result =
              "ก่อนเริ่มเรียนเจ้าก็ต้องเข้าใจมันก่อนสิ แค่นี้ก็ต้องให้ข้าบอก ตั้งใจฟังคำอธิบายซะ...";
            break;
          case "9":
            result =
              "เจ้ามั่นใจรึว่าเข้าใจบทเรียนนี้ดีแล้ว... ถ้าไม่อย่างนั้นล่ะก็ ตั้งใจฟังคำอธิบายให้ดี";
            break;
          case "10":
            result =
              "เจ้าจะไม่ฟังคำอธิบายบทเรียนรึ.. ข้าก็ช่วยเจ้าไม่ได้นะ.. นอกจากเจ้าจะตั้งใจฟังที่กัปตันพูด";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Grammar : Grammar Action (สอบไวยากรณ์)
      else if (type == "grammaraction") {
        switch (level) {
          case "0":
            result =
              "เรามาตอบคำถามแข่งกัน เธอคิดว่าใครจะเก่งกว่ากันล่ะ  รอสัญญาณจากกัปตันนะ หนึ่ง.. สอง...";
            break;
          case "1":
            result =
              "ยู้วฮู้วว เรื่องแข่งละก็...ไม่เคยแพ้ใครเหมือนกัน ถ้าน้องพร้อมแล้วเรามาแข่งกันเถอะ";
            break;
          case "2":
            result =
              "แคว๊ก!! ข้าคือคู่แข่งตลอดกาล ทันทีที่กัปตันให้สัญญาณ เจ้าเสร็จข้าแน่!! ไวยากรณ์ข้าเก่งที่สุด แคว๊ก!!";
            break;
          case "3":
            result =
              "มิตรภาพเกิดจากการแข่งขันได้ด้วยนะ เธอพร้อมรึยังล่ะ เรากำลังจะเริ่มแข่งกันแล้วนะ";
            break;
          case "4":
            result =
              "ถ้าไม่อยากแข่งกับข้า...ก็มาเล่นตอบคำถามด้วยกันเถอะ ข้ากำลังรอเจ้าอยู่เลย";
            break;
          case "5":
            result =
              "รอบนี้เรามาแข่งกันเถอะ...สหาย ข้าต้องตอบคำถามได้เยอะกว่าเจ้าแน่ เตรียมตัวให้พร้อมล่ะ...";
            break;
          case "6":
            result =
              "เจ้าว่าใครขี้โกงนะ เหมียว~ แข่งตอบคำถามหรอ...ข้าถนัดมาก รอดูให้ดีเถอะ เหมียว~";
            break;
          case "7":
            result =
              "แข่งตอบคำถามหรอ..ฉันไม่ชอบการแข่งเลย แต่ฉันอยากเล่นเป็นเพื่อนเธอนะ....";
            break;
          case "8":
            result =
              "เจ้าแห่งมังกรอย่างข้า พร้อมรับคำท้าทุกเมื่อ ให้กัปตันของเจ้าเริ่มได้เลย... ฟู่~";
            break;
          case "9":
            result =
              "คิดจะแข่งกับข้า...ไม่กลัวข้าจะโกงเจ้ารึ ถ้ากล้าขนาดนั้น เตรียมใจไว้ละกัน ฮึฮึฮึ";
            break;
          case "10":
            result =
              "ไม่มีความจำเป็นที่ข้าต้องแข่งกับเจ้า คิดจริงๆหรือว่าข้าจะแพ้นะ รอดูให้ดีเถอะ...";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Grammar : Grammar Fill in the blanks (เติมคำตอบ)
      else if (type == "fillintheblank") {
        switch (level) {
          case "0":
            result =
              "มาเล่นเติมคำกันเถอะ ถ้าเธอทำไม่ได้จริงๆ ลองกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ดูสิ";
            break;
          case "1":
            result =
              "A B..... แล้วตัวต่อไปคืออะไรน้าา~ มาเติมคำกันดีกว่า ถ้าทำไม่ได้ กด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้เลย";
            break;
          case "2":
            result =
              "ช่วยข้า ช่วยข้า เจ้าต้องช่วยข้าเติมคำที่หายไป... ทำไม่ได้เจ้าแค่กด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span>";
            break;
          case "3":
            result =
              "มาช่วยกันเติมคำที่หายไปกันเถอะ ฉันจะคอยช่วยเธอเอง แค่เธอกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span>";
            break;
          case "4":
            result =
              "แค่เรื่องเติมคำมันง่ายมาก ถ้าอยากให้ข้าช่วย ให้เจ้ากด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้เลย";
            break;
          case "5":
            result =
              "มาเลย..สหาย เราจะฝึกเติมคำกัน ข้าจะอยู่ข้างเจ้าเอง ถ้าไม่ไหวให้ลองกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ดูสิ";
            break;
          case "6":
            result =
              "เติมคำที่หายหรอ ถ้าทำไม่ได้ล่ะก็... ข้าเล่นกลช่วยเจ้าได้นะ ลองกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ดูสิ";
            break;
          case "7":
            result =
              "ช่วยฉันเติมคำที่หายไปได้ไหม เธอสามารถกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> ได้ด้วยนะ ถ้าเธอทำไม่ได้";
            break;
          case "8":
            result =
              "ถ้าเจ้าช่วยข้าเติมที่หายไป ข้าจะสอนเจ้าร่ายมนต์ ถ้าทำไม่ได้เจ้าแค่กด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span>";
            break;
          case "9":
            result =
              "ลองเติมคำในช่องว่างให้ข้าดูหน่อยสิ ฮึฮึ~ ถ้าเจ้าทำไม่ได้ล่ะก็.. ให้เจ้ากด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span>";
            break;
          case "10":
            result =
              "เจ้าน่าจะกด <span class='bg3  br-a-sm color6 q-mx-md q-pa-xs shadow-3 q-pr-md' style='display:inline-block;padding-top:9px;'><span class='relative-position far fa-question-circle q-mr-xs q-ml-sm ' style='font-size:30px;'></span> ตัวช่วย </span> นะ มันจะช่วยให้เจ้าตอบคำถามได้ง่ายขึ้น";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Reading : Reading Speaking (ฝึกการอ่าน)
      else if (type == "readingspeaking") {
        switch (level) {
          case "0":
            result =
              "เธออยากพูดภาษาอังกฤษเก่งไหม เรามาฝึกออกเสียงกันเถอะ ตั้งใจออกเสียงตามกัปตันนะ";
            break;
          case "1":
            result =
              "น้องๆ อยากร้องเพลงภาษาอังกฤษเป็นไหม ตั้งใจฟังกัปตันสิ.. แล้วออกเสียงพร้อมกันเลย";
            break;
          case "2":
            result =
              "A B C แคว๊ก!! ข้าออกเสียงชัดนะ อยากเก่งเหมือนข้าล่ะก็... ตั้งใจฟังกัปตันให้ดี แล้วออกเสียงตาม";
            break;
          case "3":
            result =
              "ถ้าเธอออกเสียงชัด จะช่วยให้เธอสื่อสารได้ดี ฉันจะฝึกออกเสียงเป็นเพื่อนเธอเอง ตั้งใจฟังกัปตันให้ดีล่ะ...";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ ข้ากับเจ้า เราสอง.. จะฝึกออกเสียงไปพร้อมกัน โฮ่ง~ ฟังกัปตันออกเสียงให้ดีนะ";
            break;
          case "5":
            result =
              "ไอ แอม จอนนี่... ฮ่าฮ่า~ เรามาฝึกออกเสียงกันสหาย เจ้าตั้งใจฟังเสียงของกัปตันให้ดี อย่าพลาดเชียว...";
            break;
          case "6":
            result =
              "ข้าออกเสียงได้เก่งกว่าเจ้าแน่นอน เหมียว~ ใครจะออกเสียงตามกัปตันได้ถูกต้องที่สุด มาแข่งกันเลย เหมียว~";
            break;
          case "7":
            result =
              "ฉันจะพยายามออกเสียงให้ดีที่สุด เธอก็ตั้งใจออกเสียงตามกัปตันล่ะ.. สู้ๆ";
            break;
          case "8":
            result =
              "ฟู่~ ถ้าไม่เริ่มจากออกเสียงให้เป็น เจ้าจะพูดภาษาอังกฤษไม่เป็น จงตั้งใจออกเสียงตามกัปตันของเจ้า ฟู่~ๆ";
            break;
          case "9":
            result =
              "อยากร่ายมนต์เป็น เจ้าต้องออกเสียงให้เป็นด้วย ตั้งใจออกเสียงตามกัปตัน แล้วข้าจะสอนมนต์สะกดให้ ฮึฮึ~";
            break;
          case "10":
            result =
              "อย่ายุ่งกับข้า... ไปตั้งใจฟังกัปตันของเจ้า แล้วฝึกออกเสียงตามให้ถูกต้องซะ";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Reading : Reading Multiple Choices (อ่านจับใจความ)
      else if (type == "readingmulti") {
        switch (level) {
          case "0":
            result =
              "เธอชอบอ่านนิทานไหม ในภารกิจนี้เราจะมาฝึกอ่านกัน อดใจรอสักครู่นะ";
            break;
          case "1":
            result =
              "จับใจในความ จับความในใจ ฮิ้วว~ รอแป๊บนะน้องๆ วันนี้เราจะมาฝึกอ่านจับใจความกัน";
            break;
          case "2":
            result =
              "แคว๊ก!! แคว๊ก!! อ่านเนื้อเรื่องต่อไปนี้ แล้วตอบคำถามจากความเข้าใจของเจ้า แคว๊ก!!";
            break;
          case "3":
            result =
              "เธอคิดว่าการอ่านยากไหม ฉันช่วยเธอได้นะ... นั่งรอสักครู่เราจะเริ่มไปพร้อมกัน";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ เจ้าชอบหนังสือไหม ลองอ่านดูสิ แล้วตอบข้าว่าในเนื้อเรื่องบอกอะไรบ้าง";
            break;
          case "5":
            result =
              "สหาย..เราจะเริ่มฝึกอ่านจับใจความกันแล้ว มาดูกันว่าเจ้าจะเข้าใจมันมากน้อยแค่ไหน ฮ่า ฮ่า";
            break;
          case "6":
            result =
              "มาอ่านจับใจความกัน เหมียว~ นอกจากนี้ยังต้องตอบคำถามด้วยนะ เหมียว~ พร้อมรึยังล่ะ...";
            break;
          case "7":
            result =
              "วันนี้เราจะฝึกอ่านจับใจความกันนะ รอสักครู่... กัปตันกำลังเตรียมความพร้อม";
            break;
          case "8":
            result =
              "ทุกสิ่งมีเรื่องราวของมัน เจ้าลองอ่านแล้วตอบคำถามดูสิ ว่าเจ้าเข้าใจมันหรือไม่";
            break;
          case "9":
            result =
              "ฮึฮึ~ ข้ามีคำถามอยากถามเจ้า แต่เจ้าต้องอ่านเนื้อเรื่องต่อไปนี้ให้เข้าใจซะก่อน.. พร้อมรึยังล่ะ";
            break;
          case "10":
            result =
              "อย่างแรกคือ นั่งรอกัปตันของเจ้า.. หลังจากนั้น แค่อ่านแล้วตอบคำถามให้ถูก ไม่ยากสินะ ";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Reading : Reading Fill in the blank  (อ่านจับใจความ)
      else if (type == "readingfillin") {
        switch (level) {
          case "0":
            result =
              "เธอชอบอ่านนิทานไหม ในภารกิจนี้เราจะมาฝึกอ่านกัน อดใจรอสักครู่นะ";
            break;
          case "1":
            result =
              "จับใจในความ จับความในใจ ฮิ้วว~ รอแป๊บนะน้องๆ วันนี้เราจะมาฝึกอ่านจับใจความกัน";
            break;
          case "2":
            result =
              "แคว๊ก!! แคว๊ก!! อ่านเนื้อเรื่องต่อไปนี้ แล้วตอบคำถามจากความเข้าใจของเจ้า แคว๊ก!!";
            break;
          case "3":
            result =
              "เธอคิดว่าการอ่านยากไหม ฉันช่วยเธอได้นะ... นั่งรอสักครู่เราจะเริ่มไปพร้อมกัน";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ เจ้าชอบหนังสือไหม ลองอ่านดูสิ แล้วตอบข้าว่าในเนื้อเรื่องบอกอะไรบ้าง";
            break;
          case "5":
            result =
              "สหาย..เราจะเริ่มฝึกอ่านจับใจความกันแล้ว มาดูกันว่าเจ้าจะเข้าใจมันมากน้อยแค่ไหน ฮ่า ฮ่า";
            break;
          case "6":
            result =
              "มาอ่านจับใจความกัน เหมียว~ นอกจากนี้ยังต้องตอบคำถามด้วยนะ เหมียว~ พร้อมรึยังล่ะ...";
            break;
          case "7":
            result =
              "วันนี้เราจะฝึกอ่านจับใจความกันนะ รอสักครู่... กัปตันกำลังเตรียมความพร้อม";
            break;
          case "8":
            result =
              "ทุกสิ่งมีเรื่องราวของมัน เจ้าลองอ่านแล้วตอบคำถามดูสิ ว่าเจ้าเข้าใจมันหรือไม";
            break;
          case "9":
            result =
              "ฮึฮึ~ ข้ามีคำถามอยากถามเจ้า แต่เจ้าต้องอ่านเนื้อเรื่องต่อไปนี้ให้เข้าใจซะก่อน.. พร้อมรึยังล่ะ";
            break;
          case "10":
            result =
              "อย่างแรกคือ นั่งรอกัปตันของเจ้า.. หลังจากนั้น แค่อ่านแล้วตอบคำถามให้ถูก ไม่ยากสินะ";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Writing : Translation (แต่งประโยคสนทนา)
      else if (type == "translation") {
        switch (level) {
          case "0":
            result =
              "เคยเล่นต่อคำกับเพื่อนรึเปล่าล่ะ.. เรามาเล่นกันเถอะ เราจะแต่งประโยคให้สมบูรณ์กัน รอกัปตันสั่งเริ่มแป๊บนึงนะ";
            break;
          case "1":
            result =
              "ถ้าแต่งประโยคเก่ง น้องๆจะแต่งเพลงเก่งด้วยนะ วันนี้มาช่วยกันแต่งประโยคดีกว่า พร้อมแล้ว รอกัปตันสักครู่นะครับ...";
            break;
          case "2":
            result =
              "กัปตันจะให้เจ้าแต่งประโยค แคว๊ก!! ข้า .... นกแก้ว ลองแต่งประโยคนี้ดูสิ เจ้ารู้หรือไม่.. คำไหนที่หายไป แคว๊ก!! แคว๊ก!!";
            break;
          case "3":
            result =
              "สบายใจจัง เธอจะช่วยแต่งประโยคให้เรา ขอบคุณนะ  รอแป๊บนะ อีกเดี๋ยวจะเริ่มแล้ว";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง โฮ่ง ไม่ต้องเห่าเหมือนข้า แค่เจ้าแต่งประโยคได้ ข้าก็ดีใจละ.. เดี๋ยวเรามาเริ่มกัน";
            break;
          case "5":
            result =
              "สหาย... อยากเซียนแบบข้า แต่งประโยคให้ได้แบบข้าสิ รอกัปตันของเจ้าฝึกให้แล้วกันนะ";
            break;
          case "6":
            result =
              "เหมียวววว รักข้าไหม แต่งประโยคให้ข้าหน่อยสิ รอกัปตันสั่งได้เลยนะ ";
            break;
          case "7":
            result =
              "เธอแต่งประโยคให้เราหน่อยสิ ช่วยเราหน่อยนะ ขอบคุณค่ะ ระหว่างนี้รอกัปตันสักครู่นะ..";
            break;
          case "8":
            result =
              "เฮ้ย ลูกเรือ เจ้าแต่งประโยคเป็นรึเปล่าเนี่ย ไปหัดแต่งประโยคมาซะ รอคำสั่งกัปตันของเจ้าแล้วกันนะ";
            break;
          case "9":
            result =
              "คำจริง คำลวง อยู่ที่คำแต่ง ไปหัดแต่งประโยคมาซะ จงรอกัปตันเจ้าสั่ง ";
            break;
          case "10":
            result =
              "ฝึกแต่งประโยคให้เก่ง แล้วค่อยมาคุยกับข้า รอกัปตันสั่งนะเจ้าลูกเรือ";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Phonics : Phonics (สอนออกเสียง)
      else if (type == "phonicslesson" || type == "languagetips") {
        switch (level) {
          case "0":
            result =
              "เธออยากพูดภาษาอังกฤษเก่งไหม เรามาฝึกออกเสียงกันเถอะ ตั้งใจออกเสียงตามกัปตันนะ";
            break;
          case "1":
            result =
              "น้องๆ อยากร้องเพลงภาษาอังกฤษเป็นไหม ตั้งใจฟังกัปตันสิ.. แล้วออกเสียงพร้อมกันเลย";
            break;
          case "2":
            result =
              "A B C แคว๊ก!! ข้าออกเสียงชัดนะ อยากเก่งเหมือนข้าล่ะก็... ตั้งใจฟังกัปตันให้ดี แล้วออกเสียงตาม";
            break;
          case "3":
            result =
              "ถ้าเธอออกเสียงชัด จะช่วยให้เธอสื่อสารได้ดี ฉันจะฝึกออกเสียงเป็นเพื่อนเธอเอง ตั้งใจฟังกัปตันให้ดีล่ะ...";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ ข้ากับเจ้า เราสอง.. จะฝึกออกเสียงไปพร้อมกัน โฮ่ง~ ฟังกัปตันออกเสียงให้ดีนะ";
            break;
          case "5":
            result =
              "ไอ แอม จอนนี่... ฮ่าฮ่า~ เรามาฝึกออกเสียงกันสหาย เจ้าตั้งใจฟังเสียงของกัปตันให้ดี อย่าพลาดเชียว...";
            break;
          case "6":
            result =
              "ข้าออกเสียงได้เก่งกว่าเจ้าแน่นอน เหมียว~ ใครจะออกเสียงตามกัปตันได้ถูกต้องที่สุด มาแข่งกันเลย เหมียว~";
            break;
          case "7":
            result =
              "ฉันจะพยายามออกเสียงให้ดีที่สุด เธอก็ตั้งใจออกเสียงตามกัปตันล่ะ.. สู้ๆ";
            break;
          case "8":
            result =
              "ฟู่~ ถ้าไม่เริ่มจากออกเสียงให้เป็น เจ้าจะพูดภาษาอังกฤษไม่เป็น จงตั้งใจออกเสียงตามกัปตันของเจ้า ฟู่~";
            break;
          case "9":
            result =
              "อยากร่ายมนต์เป็น เจ้าต้องออกเสียงให้เป็นด้วย ตั้งใจออกเสียงตามกัปตัน แล้วข้าจะสอนมนต์สะกดให้ ฮึฮึ~";
            break;
          case "10":
            result =
              "อย่ายุ่งกับข้า... ไปตั้งใจฟังกัปตันของเจ้า แล้วฝึกออกเสียงตามให้ถูกต้อง";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Phonics : Multiple Choices (Question Sound) && Multiple Choices (Answer Sound)  (ฝึกออกเสียง)
      else if (
        type == "multiplechoice(questionsound)" ||
        type == "multiplechoice(answersound)"
      ) {
        switch (level) {
          case "0":
            result =
              "เธอรู้ไหม เสียงที่ได้ยินคือคำว่าอะไร ใส่หูฟังของเธอสิ แล้วรอกัปตันสั่งเริ่มกันเลย...";
            break;
          case "1":
            result =
              "ใส่หูฟังแล้วนั่งรอนะครับ น้องๆ เราจะช่วยกันฟังว่าเสียงที่ได้ยินคือคำว่าอะไร";
            break;
          case "2":
            result =
              "พร้อมแล้ว พร้อมแล้ว ข้าพร้อมแล้ว รอไม่ไหวแล้ว แคว๊ก~ แคว๊ก~ ใส่หูฟังซะ แคว๊ก~";
            break;
          case "3":
            result =
              "ใส่หูฟังแล้วช่วยฉันฟังหน่อยสิ มันคือคำว่าอะไร เธอพร้อมนะ...";
            break;
          case "4":
            result =
              "เจ้ารู้รึไม่... ว่าเจ้าได้ยินเสียงของคำว่าอะไร ใส่หูฟังแล้วนั่งรอได้เลย เรามาช่วยกัน โฮ่ง โฮ่ง~~";
            break;
          case "5":
            result =
              "ใส่หูฟังของเจ้ารอได้เลย สหาย แล้วเราจะมาฟังเสียงไปด้วยกัน ฮ่า ฮ่า...";
            break;
          case "6":
            result =
              "ระหว่างรอกัปตัน... มองที่หมวกข้าสิ... นี่ใช่หูฟังของเจ้ารึป่าว ใส่ซะสิ เหมียว~";
            break;
          case "7":
            result =
              "ระหว่างที่รอกัปตัน อย่าลืมใส่หูฟังด้วยนะ เราจะเริ่มฝึกฟังเสียงด้วยกัน...";
            break;
          case "8":
            result =
              "ใส่หูฟังให้พร้อม แล้วทำคะแนนให้ดี ไม่งั้นข้าจะพ่นไฟใส่เจ้า ฟู่~";
            break;
          case "9":
            result =
              "ฮึฮึ~ เสียงที่เจ้าได้ยินมีเพียงคำตอบเดียว ลองฟังดูสิคำว่าอะไร ";
            break;
          case "10":
            result =
              "หึหึ... ใส่หูฟังแล้วนั่งรอกัปตันของเจ้า นิ่งๆ เข้าใจไหม....";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE Listen & Speaking : Roleplay (บทหนังสั้น)
      else if (type == "roleplay") {
        switch (level) {
          case "0":
            result =
              "เธออยากเล่นสวมบทบาทตัวละครไหม เราจะฝึกพูดจากบทหนังสั้น มาเล่นหนังสั้นด้วยกันเถอะ";
            break;
          case "1":
            result =
              "น้องๆ อยากลองเล่นหนังดูไหม รอกัปตันก่อนนะ.. แล้วลองมาสวมบทบาทตัวละครกัน";
            break;
          case "2":
            result =
              "แคว๊ก!! เจ้าอยากเป็นตัวละครไหน ในเรื่องนี้ล่ะ ลองพูดบทบาทของเจ้าดูซิ แคว๊ก!! แคว๊ก!!";
            break;
          case "3":
            result =
              "ฉันคือเจ้าหญิง แล้วเธอล่ะ.. อยากเล่นบทอะไรในหนังเรื่องนี้ มาลองดูกันเถอะ รอฟังคำสั่งจากกัปตันนะ";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ ถ้าเจ้าอยากฝึกพูดให้สนุก ไม่ลองฝึกพูดแบบมีบทบาทล่ะ สนุกกว่าเยอะ มาเล่นกับข้าเถอะ...";
            break;
          case "5":
            result =
              "โจรสลัดจอนนี่ คือบทของข้า เจ้าอยากเล่นบทอะไรล่ะ..สหาย มีบทให้เจ้าฝึกพูดเยอะแยะเลย";
            break;
          case "6":
            result =
              "เจ้าและเพื่อนๆ จะได้ฝึกพูดโดยบทบาทหนังสั้น แค่คิดก็สนุกแล้วใช่ไหมล่ะ.... เตรียมตัวรอได้เลย เหมียว~";
            break;
          case "7":
            result =
              "เธออยากเป็นตัวละครในหนังบ้างไหม ลองเลือกบทบาทที่เธอสนใจดูซิ ฉันอยากให้เธอแสดงให้ดู";
            break;
          case "8":
            result =
              "จะให้ข้าไปเล่นหนังกับเจ้าเนี่ยนะ ทำไมเจ้าไม่เล่นให้ข้าดูแทนล่ะ.. ฟู่~";
            break;
          case "9":
            result =
              "ฮึฮึ~ กัปตันอยากให้เจ้าฝึกพูดจากบทหนังสั้นรึ ข้าไม่ยอมยกบทแม่มดให้เจ้าหรอกนะ..";
            break;
          case "10":
            result =
              "ข้าจะนั่งดูอย่างเดียว เชิญเจ้าทำตามที่กัปตันสั่ง แล้วเลือกบทบาทที่เจ้าอยากพูด..";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE Listen & Speaking : Speaking (ดูหนังสั้น)
      else if (type == "speaking") {
        switch (level) {
          case "0":
            result =
              "เธอลองสวมบทบาทตัวละครแล้วใช่ไหม คราวนี้เรามาลองดูหนังสั้นจริงๆ กันดีกว่า";
            break;
          case "1":
            result =
              "น้องๆ ชอบดูหนังไหม วันนี้..พี่มีหนังมาให้ดูด้วยนะ ใกล้จะเริ่มแล้ว.. รอสักครู่นะ";
            break;
          case "2":
            result =
              "ดูหนัง!! ดูหนัง!! ข้าชอบดูหนังที่สุด เจ้าอยากดูหนังกับข้าไหมล่ะ รอกัปตันของเจ้าเตรียมความพร้อมก่อนล่ะ..";
            break;
          case "3":
            result =
              "เรามาดูหนังด้วยกันเถอะ ดูซิว่าเรื่องที่เธอดูเขาพูดว่าอะไรกันบ้าง รอกัปตันเตรียมความพร้อมสักครู่นะ";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ อยากดูหนังกับข้าสักเรื่องไหมละ ในนี้มีบทบาทที่เจ้าเคยฝึกพูดด้วยนะ รอกัปตันเตรียมการสักครู่..";
            break;
          case "5":
            result =
              "สหาย.. บทเรียนวันนี้สนุกกว่าที่เจ้าคิด เราจะมาดูหนังสั้นด้วยกัน พร้อมรึยังล่ะ.. ใกล้ได้เวลาแล้ว";
            break;
          case "6":
            result =
              "เจ้าและเพื่อนๆ จะได้ฝึกพูดโดยีบทบาทหนังสั้น แค่คิดก็สนุกแล้วใช่ไหมละ.... เตรียมตัวรอได้เลย เหมียว~";
            break;
          case "7":
            result =
              "ฉันกำลังรอดูหนังอยู่ ฉันชอบดูหนังมาก.. เธอสนใจมาดูหนังสั้นกับฉันสักเรื่องไหม รอเดี๋ยวนะ";
            break;
          case "8":
            result =
              "นี่เป็นเวลาดูหนังของข้า ถ้าเจ้าอยากจะดูด้วยล่ะก็... ให้กัปตันของเจ้าเปิดให้ดูสิ ฟู่~";
            break;
          case "9":
            result =
              "ฮึฮึ~ กัปตันอยากให้เจ้าดูหนังสั้นรึ ก็ดีแล้วนิ เจ้าจะได้ฝึกฟังบทสนทนาของจริง";
            break;
          case "10":
            result =
              "หนังสั้นคืออะไร นั่งรอกัปตันของเจ้าสิ เดี๋ยวเจ้าก็จะได้รู้";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
    }
    // NOTE : Page Main (หน้าหลัก)
    else if (active == "main") {
      switch (level) {
        case "0":
          result = "เราจะออกเดินทางกันแล้ว รอกัปตันสักครู่นะ";
          break;
        case "1":
          result = "รอกัปตันสักครู่นะน้องๆ เราจะออกเดินทางไปพร้อมกัน";
          break;
        case "2":
          result =
            "รอกัปตันก่อนนะ แคว๊ก!! การเดินทางจะเริ่มขึ้นแล้ว แคว๊ก!! แคว๊ก!!";
          break;
        case "3":
          result = "รอกัปตันนำเรือออกก่อนนะ ฉันจะเดินทางไปพร้อมกับเธอเอง";
          break;
        case "4":
          result =
            "ข้าพร้อมจะไปกับเจ้าทุกที่ อดใจรอสักครู่ เราจะไปด้วยกัน โฮ่ง โฮ่ง..";
          break;
        case "5":
          result =
            "ฮ่า ฮ่า~ ได้เวลาผจญภัยกันแล้ว สหาย.. รอกัปตันของเจ้าสักครู่";
          break;
        case "6":
          result =
            "ข้าจะไป เจ้าจะไปไหม .. มาสิมา นั่งรอสักครู่การเดินทางจะเริ่มขึ้นแล้ว";
          break;
        case "7":
          result =
            "ฉันรู้จักทะเลดีกว่าใคร อยากเดินทางไปด้วยกันไหม รอกัปตันสักครู่สิ";
          break;
        case "8":
          result =
            "เจ้าพร้อมกับการเดินทางรึไม่ ถ้าพร้อมแล้ว รอกัปตันของเจ้านำเรือออกได้เลย";
          break;
        case "9":
          result =
            "ทุกอย่างมีอุปสรรครออยู่ โฮะ โฮะ~ ถ้าเจ้าไม่กลัว รอกัปตันสักครู่ การเดินทางจะเริ่มขึ้นแล้ว";
          break;
        case "10":
          result = "เจ้าจะออกเดินทางรึ.. รอกัปตันอยู่สินะ ขอให้โชคด";
          break;
        default:
          result = "ตั้งใจทำนะ";
          break;
      }
    }
    // NOTE : Page Waiting Friend (หน้ารอเพื่อนทำแบบฝึกหัด)
    else if (active == "finish-waiting") {
      // NOTE : Page Surprise Score (หน้ารอลุ้นคะแนนพิเศษ)
      if (
        type == "flashcard" ||
        type == "phonicslesson" ||
        type == "readingspeaking"
      ) {
        switch (level) {
          case "0":
            result = "สนุกจังเลย!! เธอว่าแบบนั้นไหม รอความสนุกต่อไปกันเถอะ...";
            break;
          case "1":
            result =
              "รู้คำศัพท์ขึ้นเยอะเลยสินะ ระหว่างรอ ร้องเพลงไปด้วยกันเถอะ ยู้วฮู้วว~";
            break;
          case "2":
            result =
              "รอ... รอ... แคว๊ก!! แคว๊ก!! รอคำสั่งกัปตันก่อน... แคว๊ก!! แคว๊ก!!";
            break;
          case "3":
            result = "คิดแล้วว่าเธอต้องสนุกแน่ๆ ตอนนี้นั่งพักสักครู่นะคะ";
            break;
          case "4":
            result =
              "โฮ่ง โฮ่ง~ เดี๋ยวกัปตันก็บอกเองว่าต้องทำอะไร ตอนนี้นั่งพักก่อนนะ โฮ่ง~";
            break;
          case "5":
            result =
              "ฮ่า ฮ่า เจ้าทำได้ดีกว่าที่ข้าคิด เรามารอคำสั่งต่อไปกันเถอะ";
            break;
          case "6":
            result = "นั่งรอกัปตันก่อนนะ ระหว่างนี้ข้าจะสอนกลไพ่ล่องหนให้เอง";
            break;
          case "7":
            result = "เราชวนคุยไม่เก่ง แต่ให้เรานั่งรอกัปตันเป็นเพื่อนเธอได้นะ";
            break;
          case "8":
            result = "ฟู่~~ เจ้าพร้อมจะฟังคำสั่งต่อไปของกัปตันแล้วใช่ไหม...";
            break;
          case "9":
            result =
              "กัปตันของเจ้าจะให้ทำอะไรต่อไปนะหรอ ข้าจะรู้ได้ยังไง.. รอดูเอาเองสิ";
            break;
          case "10":
            result = "คำสั่งใหม่ของกัปตันเจ้าคือ.... รอก่อน เข้าใจไหม?";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
      // NOTE : Page Waiting Friend (หน้ารอเพื่อนทำแบบฝึกหัด)
      else {
        switch (level) {
          case "0":
            result = "สนุกใช่ไหมล่ะ ทำเสร็จก่อนเพื่อนเลย รอเพื่อนๆ ก่อนละกัน";
            break;
          case "1":
            result =
              "ดนตรีช่วยให้ผ่อนคลายใช่ไหม ระหว่างรอเพื่อน เดี๋ยวพี่สอนกีต้าร์ละกัน";
            break;
          case "2":
            result = "รอก่อน รอก่อน เพื่อนของเจ้ายังคงทำแบบฝึกหัดอยู่นะ...";
            break;
          case "3":
            result = "ว้าว..เธอทำเสร็จก่อนใครเลย รอเพื่อนสักครู่นะ";
            break;
          case "4":
            result =
              "นายเก่งที่สุดเลย โฮ่ง โฮ่ง     มานั่งรอเพื่อนๆ ไปพร้อมกันเถอะ";
            break;
          case "5":
            result =
              "เจ้าทำได้ดีกว่าที่ข้าคิดไว้อีกนะ ระหว่างนี้นั่งรอเพื่อนของเจ้าก่อนละกัน";
            break;
          case "6":
            result =
              "ฝึกอีกนิดหน่อยเจ้าก็เก่งแล้ว ระหว่างรอเพื่อน ข้าจะสอนมายากลให้เอง";
            break;
          case "7":
            result = "เธอมานับเปลือกหอยรอเพื่อนๆ กันเถอะ";
            break;
          case "8":
            result =
              "เจ้าตั้งใจทำได้ดีมาก ข้าจะไม่พ่นไฟใส่เจ้า มารอดูเพื่อนเจ้าเถอะ";
            break;
          case "9":
            result = "ไม่เห็นรึไง เพื่อนของเจ้ายังทำแบบฝึกหัดไม่เสร็จ รอก่อนสิ";
            break;
          case "10":
            result = "ไม่เลวเลยนะ ทำเสร็จไวดีนิ รอพวกลูกเรือที่ช้าก่อนเถอะ";
            break;
          default:
            result = "ตั้งใจทำนะ";
            break;
        }
      }
    }
    // NOTE : Page Finish Extra Score (หน้าได้รับคะแนนพิเศษ)
    else if (active == "extra-score") {
      switch (level) {
        case "0":
          result =
            "ดูสิ ดูสิ พวกเราได้รางวัลพิเศษด้วยล่ะ เตรียมรับคำสั่งต่อไปกันเถอะ รอบหน้าต้องได้รางวัลอีกแน่";
          break;
        case "1":
          result =
            "พี่รู้ว่าน้องทำเต็มที่ พวกเราถึงได้คะแนนพิเศษไง เอาล่ะ.. เราจะมาร้องเพลงกันระหว่างที่รอกัปตัน";
          break;
        case "2":
          result =
            "เจ้านี้มันโชคดีจริงๆ ได้รับรางวัลพิเศษด้วย แคว๊ก!! ตอนนี้รอกัปตันสั่งการนะ แคว๊ก!! แคว๊ก!!";
          break;
        case "3":
          result =
            "ว้าว..กัปตันใหรางวัลพิเศษกับพวกเราด้วย มารอดูกันเถอะว่าจะมีอะไรให้ทำต่อไป...";
          break;
        case "4":
          result =
            "โฮ่ง โฮ่ง~ พวกเราได้รางวัลพิเศษด้วยล่ะ โฮ่ง~ รอเดี๋ยวนะ กัปตันกำลังจะออกคำสั่งใหม่แล้ว";
          break;
        case "5":
          result =
            "ฮ่า ฮ่า.. เพราะเจ้าทำได้ดีสหาย พวกเราจึงได้รางวัลพิเศษ กัปตันจะให้ทำอะไรต่อนะ ข้าอยากรู้จังเลย";
          break;
        case "6":
          result =
            "รางวัลพิเศษหรอ ข้าก็ให้ได้นะ ไม่ลองเอาอะไรมาแลกล่ะ เหมียว~~";
          break;
        case "7":
          result =
            "ยินดีด้วยนะที่เธอได้รางวัลพิเศษ... เอ่อ... ตอนนี้ช่วยรอกัปตันหน่อยนะ";
          break;
        case "8":
          result =
            "ทำได้ไม่เลวเลยนะ รางวัลนี้เหมาะสำหรับความพยายามในครั้งนี้ ฟู่~~";
          break;
        case "9":
          result =
            "อย่างเจ้าเนี่ยนะได้รางวัลพิเศษ แต่ชั่งเถอะ ข้าไม่ได้สนใจ จงไปรอรับคำสั่งจากกัปตันของเจ้าซะ ...";
          break;
        case "10":
          result = "หึหึ.. เจ้าเก่งดี ระดับของเจ้าจะถูกพัฒนาขึ้น...";
          break;
        default:
          result = "ตั้งใจทำนะ";
          break;
      }
    }
    // NOTE : Page Finish Practice (หน้าคะแนนหลังจบแบบฝึกหัด)
    else if (active == "finish-practice") {
      switch (level) {
        case "0":
          result = "เอาหน่าา~~ เรารู้ว่าเธอทำเต็มที่แล้วว สู้ๆ นะ!";
          break;
        case "1":
          result =
            "พี่รู้ว่าน้องอ่ะทำเต็มที่แล้ว ผิดบ้างก็ไม่เป็นไรนะ ยู้วฮุ้วว~";
          break;
        case "2":
          result =
            "ไม่เท่าไหร่ ไม่เท่าไหร่ ข้ายังเก่งกว่าเจ้าอีก ลองทำให้เหมือนข้าสิ แคว๊ก!!";
          break;
        case "3":
          result =
            "ว้าว~ >.< พยายามได้ดีมากเลย ถ้าเป็นแบบนี้ต่อไปเธอจะเก่งขึ้นกว่านี้แน่นอน";
          break;
        case "4":
          result = "ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั้น โฮ่ง โฮ่ง..";
          break;
        case "5":
          result = "ฮ่า ฮ่า... เจ้าทำดีที่สุดแล้วสหาย จงภูมิใจในตัวเองเถิด";
          break;
        case "6":
          result =
            "เจ้าทำเต็มที่แล้วสินะ เหมียว~  ยังสู้มายากลของข้าไม่ได้เลย เหมียว~";
          break;
        case "7":
          result = "ความพยายามไม่เคยทำร้ายคนที่ตั้งใจ จงภูมิใจในตัวเองเถิด";
          break;
        case "8":
          result = "ทำได้ไม่เลวเลย มันคือความพยายามของเจ้าสินะ";
          break;
        case "9":
          result = "สุดความสามารถของเจ้าแล้วรึ งั้นข้าภูมิใจด้วยนะ";
          break;
        case "10":
          result = "นี้คือความพยายามของเจ้าสินะ ก็จงภูมิใจในตัวเองซะ";
          break;
        default:
          result = "ตั้งใจทำนะ";
          break;
      }
    }
    // NOTE : Page Finish World (หน้าสรุปจบแบบฝึกหัดทั้งหมด)
    else if (active == "finish-world") {
      switch (level) {
        case "0":
          result =
            "ไว้เรามาเล่นด้วยกันอีกน้าา~ เธอทำเต็มที่แล้ว เราจะคอยเป็นกำลังใจให้";
          break;
        case "1":
          result =
            "โว้วว~ น้องทำดีให้ทำต่อไป ที่น้องพยามทำอย่างตั้งใจ...พี่ก็ว่าดี";
          break;
        case "2":
          result =
            "นกรู้ นกรู้ แคว๊ก!! เจ้าทำเต็มที่แล้วสินะ... ต้องภูมิใจในตัวเองสิ แคว๊ก!!";
          break;
        case "3":
          result =
            "คะแนนไม่สำคัญเท่าความตั้งใจของเธอหรอก ฉันดีใจที่เธอทำมันอย่างเต็มที่";
          break;
        case "4":
          result =
            "ได้เท่าไหร่ไม่สำคัญ แค่เจ้าตั้งใจทำมัน ก็ถือว่าสำเร็จแล้ว โฮ่ง~";
          break;
        case "5":
          result =
            "สหาย...เจ้าทำภารกิจอย่างสุดความสามารถแล้ว จงภูมิใจในตัวเอง...";
          break;
        case "6":
          result = "เจ้ามีความตั้งใจอย่างมาก ข้าภูมิใจในตัวเจ้านะ เหมียว~";
          break;
        case "7":
          result = "เอ่อ.. ฉันชมใครไม่เก่งนะ แต่ฉันดีใจที่เธอพยาพยามทำเต็มที่";
          break;
        case "8":
          result =
            "ไม่ว่าเจ้าจะได้คะแนนเท่าไหร่ ถ้ามันมาจากความตั้งใจ เจ้าจงภูมิใจกับมัน";
          break;
        case "9":
          result =
            "เมื่อเทียบกับข้า... คะแนนเจ้าก็ไม่เท่าไหร่ แต่ข้ายอมรับความตั้งใจในตัวเจ้า";
          break;
        case "10":
          result =
            "ข้าภูมิใจในตัวเองเสมอ แล้วเจ้าไม่ภูมิใจที่พยายามทำลงไปรึ.....";
          break;
        default:
          result = "ตั้งใจทำนะ";
          break;
      }
    }

    // NOTE : Page Vote Mission (หน้าเลือกภารกิจ)
    else if (active == "vote") {
      switch (level) {
        case "0":
          result =
            "รอเพื่อนๆ เลือกแป๊บนะ... แล้วมาลุ้นกันว่าจะได้ทำภารกิจอะไร?";
          break;
        case "1":
          result =
            "ลา ลั้น ลา... ข้าร้องเพลงให้เจ้าฟัง ก่อนไหม รอเพื่อนเลือกภารกิจแป๊บนะ";
          break;
        case "2":
          result = "โอ๊ย... เจ้าเด็กพวกนี้ช้าจริงๆเลย... รอก่อนแล้วกันนะ";
          break;
        case "3":
          result = "เธอ...รอเพื่อนเลือกภารกิจแป๊บนะ เธอรอเป็นเพื่อนเราก่อนนะ";
          break;
        case "4":
          result =
            "มา...นุด... ช่วงรอเพื่อนเธอเลือกภารกิจ เรามาเล่นคาบของแข่งกันไหม...";
          break;
        case "5":
          result =
            "ไหน...เจ้ามีอะไรดี บอกข้ามาซิ... เจ้าลูกเรือพวกนี้ช้าจริง รอก่อนแล้วกัน";
          break;
        case "6":
          result =
            "รอแป๊บนะ ข้าจะเล่นมายากลให้เจ้าดู จ้องดูหมวกของข้าสิ แล้วเจ้าจะเห็นว่าหมวกของข้าเป็นสีม่วง.....";
          break;
        case "7":
          result =
            "เราเกรงใจจัง ถ้าจะบอกว่าเธอคงต้องรอเพื่อนเลือกภารกิจสักครู่นะ...";
          break;
        case "8":
          result =
            "นั่งเฉยๆ นะ เจ้าลูกเรือ รอเจ้าพวกลูกเรือคนอื่นเลือกภารกิจแป๊บนะ... ถ้าไม่เชื่อฟัง เดี๋ยวข้าพ่นไฟใส่เลย...";
          break;
        case "9":
          result =
            "ช่วงรอเพื่อนของเจ้า... มา... เจ้าลองกำมือขวาซิ ข้าออกกระดาษ เจ้าออกค้อน เจ้าแพ้ข้าแหละ... โฮะ โฮะ โฮะ";
          break;
        case "10":
          result =
            "รอเพื่อนก่อนนะ เจ้าแค่หายใจเข้า หายใจออก ทำแค่สองอย่างนี้ก็พอ เข้าใจนะ";
          break;
        default:
          result = "ตั้งใจทำนะ";
          break;
      }
    }

    return result;
  }
};

export default test;
