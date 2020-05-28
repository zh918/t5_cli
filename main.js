#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const { program } = require('commander');
const chalk = require('chalk');
const exec = require('child_process').exec;
const stdin = process.stdin;
const bootstrap = require('./src/index.js');

program
  .command('create <projectName>')
  .description('项目名称')
  .action(function(projectName, options){
    console.log('新建项目 "%s"', projectName);
    // 1.定义可生成哪些模板，供用户选择
    const templateArray = [
      "t5-pc-template",
      "t5-mobile-template",
      "t5-wechat-mp-template",
      "t5-nest-service"
    ];

    console.log("模板如下：")
    templateArray.forEach((t, i)=>{
      console.log((i + 1), chalk.green(t));
    });

    // 2.监听用户输入选项
    console.log("请选择需要生成的模板编号:")
    stdin.on("data", async function(data){
      const inputString = data.toString().slice(0, -1);
      if (!(/[0-9]+$/.test(inputString))) {
        console.log(chalk.red("请输入正确的模板编号"));
        return;
      }

      console.log(process.cwd());
      let projectPath = path.join(process.cwd(), projectName);
      await bootstrap.createPcTemplate(projectPath);
      console.log(chalk.blue(`"你选择的模板为:"${templateArray[inputString - 1]}`));

      stdin.pause();

    });


  }).on('--help', function() {
    
  });

program.parse(process.argv);

