/* 
written by MatLum (aka sepi) on 28 march 2024;
*/

const CSS_VALUE_TO_HIDE_ELEMENT = "hidden";
const CSS_VALUE_TO_SHOW_ELEMENT = "visible";
const LOGGER_PREFIX_TITLE = "LOGGIN FROM sepi_selective_cats_display";

function custom_logger(title, msg)
	{
	console.log(`
		LOG : ${title}
		${msg}
		`);
	}


function test_logger(test_title, result, expexted, calced)
	{
	console.log(
		`
		TEST_RESULT_REPORT:
			title : ${test_title}
			result : ${result}
			expected : ${expexted}
			calced : ${calced}
		`
		);
	}


function query_selector_all(command)
	{
	custom_logger("executing query secelt command", command)
	let output = document.querySelectorAll(command);
	custom_logger(`output of query command ${command} is printed below`, "");
	console.log(output);
	return output;
	}

function hide_element(target)	
	{
	//target must be a html dom object
	custom_logger("hiding an element ;", "");
	console.log(target);
	target.style.visibility = CSS_VALUE_TO_HIDE_ELEMENT;
	}


function unhide_element(target)
	{
	//target must be a html dom object
	custom_logger("unhiding an element ;", "");
	console.log(target);		
	target.style.visibility = CSS_VALUE_TO_SHOW_ELEMENT;
	}

function dry_0(a, function_to_apply)
	{
	//a must a be a NodeList
	for (let index of a)
		{
		function_to_apply(index);
		}
	}

function make_all_these_elements_hidden(a)
	{
	dry_0(a, hide_element);
	}


function make_all_these_elements_visible(a)
	{
	dry_0(a, unhide_element);
	}


function copy_array(a)
	{
	let output = [];
	for (let index of a)
		{
		output.push(index);
		}
	return output;
	}


function union_arrays(a, b)
	{
	let output = copy_array(a);
	for (let index of b)
		{
		let already_exists = output.includes(index);
		if (already_exists === false)
			{
			output.push(index);
			}
		}
	output.sort();
	return output;
	}


function do_query_select_all_by_given_command_and_return_union_of_thier_outputs(commands)
	{
	custom_logger("do_query_select_all_by_given_command_and_return_union_of_thier_outputs is running with thse commands", commands)
	let output = [];
	for (let command of commands)
		{
		let output_of_command = query_selector_all(command);
		custom_logger("output of query select", output_of_command);
		output = union_arrays(output, output_of_command);
		}
	return output;
	}


function make_a_list_of_elements_with_these_html_attrs_existence(flags)
	{
	let commands = [];
	for (let flag of flags)
		{
		commands.push(`[${flag}]`);
		}
	custom_logger("commands to pick elemets which to become hiddnen", commands);

	return do_query_select_all_by_given_command_and_return_union_of_thier_outputs(commands);
	}


function sscd__do_the_thing(flag_to_show, flasgs_to_hide)
	{
	let elements_to_show = query_selector_all(`[${flag_to_show}]`);
	custom_logger("elemts to show", "as printed below")
	console.log(elements_to_show);
	make_all_these_elements_visible(elements_to_show);
	let elements_to_hide = make_a_list_of_elements_with_these_html_attrs_existence(flasgs_to_hide);
	custom_logger("elements_to_hide");
	console.log(elements_to_hide);
	make_all_these_elements_hidden(elements_to_hide);
	}


//tests 
function test_1()
	{
	let a = [1,3,5];
	let b = [2,4,6];
	let calced = union_arrays(a,b);
	let expected = [1,2,3,4,5,6];
	let output = calced == expected;
	test_logger("test_1", "idk", expected, calced)
	}


test_1();
