PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE problems (
  number      INTEGER PRIMARY KEY,
  title       TEXT NOT NULL,
  difficulty  TEXT,                -- Easy | Medium | Hard, NULL for SQL
  kind        TEXT NOT NULL,       -- 'algorithmic' | 'sql'
  folder      TEXT NOT NULL,       -- e.g. '3.Longest_Substring_Without_Repeating_Characters'
  created_at  INTEGER NOT NULL,    -- unix seconds
  CHECK (kind IN ('algorithmic', 'sql')),
  CHECK (kind = 'sql' OR difficulty IN ('Easy', 'Medium', 'Hard'))
);
INSERT INTO problems VALUES(1,'Two Sum','Easy','algorithmic','1.Two_Sum',1514764800);
INSERT INTO problems VALUES(2,'Add Two Numbers','Medium','algorithmic','2.Add_Two_Numbers',1767225600);
INSERT INTO problems VALUES(3,'Longest Substring Without Repeating Characters','Medium','algorithmic','3.Longest_Substring_Without_Repeating_Characters',1767225600);
INSERT INTO problems VALUES(5,'Longest Palindromic Substring','Medium','algorithmic','5.Longest_Palindromic_Substring',1767225600);
INSERT INTO problems VALUES(6,'Zigzag Conversion','Medium','algorithmic','6.Zigzag_Conversion',1767225600);
INSERT INTO problems VALUES(7,'Reverse Integer','Medium','algorithmic','7.Reverse_Integer',1767225600);
INSERT INTO problems VALUES(8,'String to Integer (atoi)','Medium','algorithmic','8.String_to_Integer(atoi)',1767225600);
INSERT INTO problems VALUES(9,'Palindrome Number','Easy','algorithmic','9.Palindrome_Number',1769904000);
INSERT INTO problems VALUES(11,'Container With Most Water','Medium','algorithmic','11.Container_With_Most_Water',1767225600);
INSERT INTO problems VALUES(12,'Integer to Roman','Medium','algorithmic','12.Integer_to_Roman',1767225600);
INSERT INTO problems VALUES(13,'Roman to Integer','Easy','algorithmic','13.Roman_to_Integer',1514764800);
INSERT INTO problems VALUES(15,'3Sum','Medium','algorithmic','15.3Sum',1769904000);
INSERT INTO problems VALUES(16,'3Sum Closest','Medium','algorithmic','16.3Sum_Closest',1769904000);
INSERT INTO problems VALUES(19,'Remove Nth Node From End of List','Medium','algorithmic','19.Remove_Nth_Node_From_End_of_List',1772323200);
INSERT INTO problems VALUES(20,'Valid Parentheses','Easy','algorithmic','20.Valid_Parentheses',1519862400);
INSERT INTO problems VALUES(21,'Merge Two Sorted Lists','Easy','algorithmic','21.Merge_Two_Sorted_Lists',1772323200);
INSERT INTO problems VALUES(28,'Find the Index of the First Occurrence in a String','Easy','algorithmic','28.Find_the_Index_of_the_First_Occurrence_in_a_String',1767225600);
INSERT INTO problems VALUES(33,'Search in Rotated Sorted Array','Medium','algorithmic','33.Search_in_Rotated_Sorted_Array',1772323200);
INSERT INTO problems VALUES(35,'Search Insert Position','Easy','algorithmic','35.Search_Insert_Position',1772323200);
INSERT INTO problems VALUES(39,'Combination Sum','Medium','algorithmic','39.Combination_Sum',1772323200);
INSERT INTO problems VALUES(46,'Permutations','Medium','algorithmic','46.Permutations',1772323200);
INSERT INTO problems VALUES(55,'Jump Game','Medium','algorithmic','55.Jump_Game',1769904000);
INSERT INTO problems VALUES(56,'Merge Intervals','Medium','algorithmic','56.Merge_Intervals',1772323200);
INSERT INTO problems VALUES(57,'Insert Interval','Medium','algorithmic','57.Insert_Interval',1772323200);
INSERT INTO problems VALUES(66,'Plus One','Easy','algorithmic','66.Plus_One',1519862400);
INSERT INTO problems VALUES(70,'Climbing Stairs','Easy','algorithmic','70.Climbing_Stairs',1769904000);
INSERT INTO problems VALUES(78,'Subsets','Medium','algorithmic','78.Subsets',1772323200);
INSERT INTO problems VALUES(83,'Remove Duplicates from Sorted List','Easy','algorithmic','83.Remove_Duplicates_from_Sorted_List',1772323200);
INSERT INTO problems VALUES(84,'Largest Rectangle in Histogram','Hard','algorithmic','84.Largest_Rectangle_in_Histogram',1769904000);
INSERT INTO problems VALUES(100,'Same Tree','Easy','algorithmic','100.Same_Tree',1772323200);
INSERT INTO problems VALUES(110,'Balanced Binary Tree','Easy','algorithmic','110.Balanced_Binary_Tree',1769904000);
INSERT INTO problems VALUES(118,'Pascal''s Triangle','Easy','algorithmic','118.Pascal''s_Triangle',1769904000);
INSERT INTO problems VALUES(119,'Pascal''s Triangle II','Easy','algorithmic','119.Pascal''s_Triangle_II',1769904000);
INSERT INTO problems VALUES(121,'Best Time to Buy and Sell Stock','Easy','algorithmic','121.Best_Time_to_Buy_and_Sell_Stock',1769904000);
INSERT INTO problems VALUES(125,'Valid Palindrome','Easy','algorithmic','125.Valid_Palindrome',1772323200);
INSERT INTO problems VALUES(133,'Clone Graph','Medium','algorithmic','133.Clone_Graph',1772323200);
INSERT INTO problems VALUES(136,'Single Number','Easy','algorithmic','136.Single_Number',1772323200);
INSERT INTO problems VALUES(141,'Linked List Cycle','Easy','algorithmic','141.Linked_List_Cycle',1772323200);
INSERT INTO problems VALUES(150,'Evaluate Reverse Polish Notation','Medium','algorithmic','150.Evaluate_Reverse_Polish_Notation',1767225600);
INSERT INTO problems VALUES(151,'Reverse Words in a String','Medium','algorithmic','151.Reverse_Words_in_a_String',1767225600);
INSERT INTO problems VALUES(153,'Find Minimum in Rotated Sorted Array','Medium','algorithmic','153.Find_Minimum_in_Rotated_Sorted_Array',1772323200);
INSERT INTO problems VALUES(155,'Min Stack','Medium','algorithmic','155.Min_Stack',1519862400);
INSERT INTO problems VALUES(175,'Combine Two Tables',NULL,'sql','175.Combine_Two_Tables',1775001600);
INSERT INTO problems VALUES(176,'Second Highest Salary',NULL,'sql','176.Second_Highest_Salary',1775001600);
INSERT INTO problems VALUES(177,'Nth Highest Salary',NULL,'sql','177.Nth_Highest_Salary',1775001600);
INSERT INTO problems VALUES(181,'Employees Earning More Than Their Managers',NULL,'sql','181.Employees_Earning_More_Than_Their_Managers',1775001600);
INSERT INTO problems VALUES(182,'Duplicate Emails',NULL,'sql','182.Duplicate_Emails',1775001600);
INSERT INTO problems VALUES(183,'Customers Who Never Order',NULL,'sql','183.Customers_Who_Never_Order',1775001600);
INSERT INTO problems VALUES(191,'Number of 1 Bits','Easy','algorithmic','191.Number_of_1_Bits',1772323200);
INSERT INTO problems VALUES(196,'Delete Duplicate Emails',NULL,'sql','196.Delete_Duplicate_Emails',1775001600);
INSERT INTO problems VALUES(197,'Rising Temperature',NULL,'sql','197.Rising_Temperature',1775001600);
INSERT INTO problems VALUES(200,'Number of Islands','Medium','algorithmic','200.Number_of_Islands',1772323200);
INSERT INTO problems VALUES(206,'Reverse Linked List','Easy','algorithmic','206.Reverse_Linked_List',1772323200);
INSERT INTO problems VALUES(207,'Course Schedule','Medium','algorithmic','207.Course_Schedule',1772323200);
INSERT INTO problems VALUES(208,'Implement Trie','Medium','algorithmic','208.Implement_Trie',1519862400);
INSERT INTO problems VALUES(215,'Kth Largest Element in an Array','Medium','algorithmic','215.Kth_Largest_Element_in_an_Array',1772323200);
INSERT INTO problems VALUES(231,'Power Of Two','Easy','algorithmic','231.Power_Of_Two',1519862400);
INSERT INTO problems VALUES(238,'Product of Array Except Self','Medium','algorithmic','238.Product_of_Array_Except_Self',1767225600);
INSERT INTO problems VALUES(242,'Valid Anagram','Easy','algorithmic','242.Valid_Anagram',1772323200);
INSERT INTO problems VALUES(257,'Binary Tree Paths','Easy','algorithmic','257.Binary_Tree_Paths',1519862400);
INSERT INTO problems VALUES(278,'First Bad Version','Easy','algorithmic','278.First_Bad_Version',1772323200);
INSERT INTO problems VALUES(280,'Wiggle Sort','Medium','algorithmic','280.Wiggle_Sort',1519862400);
INSERT INTO problems VALUES(283,'Move Zeroes','Easy','algorithmic','283.Move_Zeroes',1767225600);
INSERT INTO problems VALUES(316,'Remove Duplicate Letters','Medium','algorithmic','316.Remove_Duplicate_Letters',1769904000);
INSERT INTO problems VALUES(326,'Power Of Three','Easy','algorithmic','326.Power_Of_Three',1519862400);
INSERT INTO problems VALUES(334,'Increasing Triplet Subsequence','Medium','algorithmic','334.Increasing_Triplet_Subsequence',1767225600);
INSERT INTO problems VALUES(338,'Counting Bits','Easy','algorithmic','338.Counting_Bits',1772323200);
INSERT INTO problems VALUES(344,'Reverse String','Easy','algorithmic','344.Reverse_String',1772323200);
INSERT INTO problems VALUES(345,'Reverse Vowels','Easy','algorithmic','345.Reverse_Vowels',1522540800);
INSERT INTO problems VALUES(347,'Top K Frequent Elements','Medium','algorithmic','347.Top_K_Frequent_Elements',1772323200);
INSERT INTO problems VALUES(387,'First Unique Character In A String','Easy','algorithmic','387.First_Unique_Character_In_A_String',1519862400);
INSERT INTO problems VALUES(389,'Find The Difference','Easy','algorithmic','389.Find_The_Difference',1522540800);
INSERT INTO problems VALUES(392,'Is Subsequence','Easy','algorithmic','392.Is_Subsequence',1767225600);
INSERT INTO problems VALUES(402,'Remove K Digits','Medium','algorithmic','402.Remove_K_Digits',1769904000);
INSERT INTO problems VALUES(406,'Queue Reconstruction by Height','Medium','algorithmic','406.Queue_Reconstruction_by_Height',1522540800);
INSERT INTO problems VALUES(409,'Longest Palindrome','Easy','algorithmic','409.Longest_Palindrome',1772323200);
INSERT INTO problems VALUES(421,'Find Maximum XOR Of Two Numbers In Array','Medium','algorithmic','421.Find_Maximum_XOR',1522540800);
INSERT INTO problems VALUES(443,'String Compression','Easy','algorithmic','443.String_Compression',1767225600);
INSERT INTO problems VALUES(448,'Find All Numbers Disappeared in an Array','Easy','algorithmic','448.Find_All_Numbers_Disappeared_in_an_Array',1767225600);
INSERT INTO problems VALUES(455,'Assign Cookies','Easy','algorithmic','455.Assign_Cookies',1772323200);
INSERT INTO problems VALUES(456,'132 Pattern','Medium','algorithmic','456.132_Pattern',1769904000);
INSERT INTO problems VALUES(463,'Island Perimeter','Easy','algorithmic','463.Island_Perimeter',1519862400);
INSERT INTO problems VALUES(485,'Max Consecutive Ones','Easy','algorithmic','485.Max_Consecutive_Ones',1767225600);
INSERT INTO problems VALUES(496,'Next Greater Element I','Easy','algorithmic','496.Next_Greater_Element_I',1769904000);
INSERT INTO problems VALUES(503,'Next Greater Element II','Medium','algorithmic','503.Next_Greater_Element_II',1769904000);
INSERT INTO problems VALUES(509,'Fibonacci Number','Easy','algorithmic','509.Fibonacci_Number',1769904000);
INSERT INTO problems VALUES(511,'Game Play Analysis I',NULL,'sql','511.Game_Play_Analysis_I',1775001600);
INSERT INTO problems VALUES(535,'Encode and Decode tinyURL','Medium','algorithmic','535.Encode_And_Decode_TinyURL',1522540800);
INSERT INTO problems VALUES(561,'Array Partition','Easy','algorithmic','561.Array_Partition',1772323200);
INSERT INTO problems VALUES(577,'Employee Bonus',NULL,'sql','577.Employee_Bonus',1775001600);
INSERT INTO problems VALUES(581,'Shortest Unsorted Continuous Subarray','Medium','algorithmic','581.Shortest_Unsorted_Continuous_Subarray',1769904000);
INSERT INTO problems VALUES(584,'Find Customer Referee',NULL,'sql','584.Find_Customer_Referee',1775001600);
INSERT INTO problems VALUES(586,'Customer Placing the Largest Number of Orders',NULL,'sql','586.Customer_Placing_the_Largest_Number_of_Orders',1775001600);
INSERT INTO problems VALUES(595,'Big Countries',NULL,'sql','595.Big_Countries',1775001600);
INSERT INTO problems VALUES(596,'Classes With at Least 5 Students',NULL,'sql','596.Classes_With_at_Least_5_Students',1775001600);
INSERT INTO problems VALUES(599,'Minimum Index Sum of Two Lists','Easy','algorithmic','599.Minimum_Index_Sum_of_Two_Lists',1772323200);
INSERT INTO problems VALUES(605,'Can Place Flowers','Easy','algorithmic','605.Can_Place_Flowers',1767225600);
INSERT INTO problems VALUES(636,'Exclusive Time of Functions','Medium','algorithmic','636.Exclusive_Time_of_Functions',1767225600);
INSERT INTO problems VALUES(645,'Set Mismatch','Easy','algorithmic','645.Set_Mismatch',1767225600);
INSERT INTO problems VALUES(654,'Maximum Binary Tree','Medium','algorithmic','654.Maximum_Binary_Tree',1769904000);
INSERT INTO problems VALUES(657,'Judge Route Circle','Easy','algorithmic','657.Judge_Route_Circle',1519862400);
INSERT INTO problems VALUES(661,'Image Smoother','Easy','algorithmic','661.Image_Smoother',1772323200);
INSERT INTO problems VALUES(703,'Kth Largest Element in a Stream','Easy','algorithmic','703.Kth_Largest_Element_in_a_Stream',1772323200);
INSERT INTO problems VALUES(704,'Binary Search','Easy','algorithmic','704.Binary_Search',1772323200);
INSERT INTO problems VALUES(713,'Subarray Product Less Than K','Medium','algorithmic','713.Subarray_Product_Less_Than_K',1772323200);
INSERT INTO problems VALUES(731,'My Calendar II','Medium','algorithmic','731.My_Calendar_II',1772323200);
INSERT INTO problems VALUES(733,'Flood Fill','Easy','algorithmic','733.Flood_Fill',1772323200);
INSERT INTO problems VALUES(739,'Daily Temperatures','Medium','algorithmic','739.Daily_Temperatures',1767225600);
INSERT INTO problems VALUES(760,'Find Anagram Mappings','Easy','algorithmic','760.Find_Anagram_Mappings',1514764800);
INSERT INTO problems VALUES(769,'Max Chunks To Make Sorted','Medium','algorithmic','769.Max_Chunks_To_Make_Sorted',1769904000);
INSERT INTO problems VALUES(771,'Jewels and Stones','Easy','algorithmic','771.Jewels_and_Stones',1514764800);
INSERT INTO problems VALUES(852,'Peak Index in a Mountain Array','Easy','algorithmic','852.Peak_Index_in_a_Mountain_Array',1772323200);
INSERT INTO problems VALUES(853,'Car Fleet','Medium','algorithmic','853.Car_Fleet',1769904000);
INSERT INTO problems VALUES(860,'Lemonade Change','Easy','algorithmic','860.Lemonade_Change',1772323200);
INSERT INTO problems VALUES(901,'Online Stock Span','Medium','algorithmic','901.Online_Stock_Span',1769904000);
INSERT INTO problems VALUES(965,'Univalued Binary Tree','Easy','algorithmic','965.Univalued_Binary_Tree',1772323200);
INSERT INTO problems VALUES(994,'Rotting Oranges','Medium','algorithmic','994.Rotting_Oranges',1772323200);
INSERT INTO problems VALUES(1046,'Last Stone Weight','Easy','algorithmic','1046.Last_Stone_Weight',1772323200);
INSERT INTO problems VALUES(1068,'Product Sales Analysis I',NULL,'sql','1068.Product_Sales_Analysis_I',1775001600);
INSERT INTO problems VALUES(1071,'Greatest Common Divisor of Strings','Easy','algorithmic','1071.Greatest_Common_Divisor_of_Strings',1767225600);
INSERT INTO problems VALUES(1114,'Print in Order','Easy','algorithmic','1114.Print_in_Order',1769904000);
INSERT INTO problems VALUES(1148,'Article Views I',NULL,'sql','1148.Article_Views_I',1775001600);
INSERT INTO problems VALUES(1356,'Sort Integers by The Number of 1 Bits','Easy','algorithmic','1356.Sort_Integers_by_The_Number_of_1_Bits',1769904000);
INSERT INTO problems VALUES(1365,'How Many Numbers Are Smaller Than the Current Number','Easy','algorithmic','1365.How_Many_Numbers_Are_Smaller_Than_the_Current_Number',1767225600);
INSERT INTO problems VALUES(1378,'Replace Employee ID With The Unique Identifier',NULL,'sql','1378.Replace_Employee_ID_With_The_Unique_Identifier',1775001600);
INSERT INTO problems VALUES(1404,'Number of Steps to Reduce a Number in Binary Representation to One','Medium','algorithmic','1404.Number_of_Steps_to_Reduce_a_Number_in_Binary_Representation_to_One',1769904000);
INSERT INTO problems VALUES(1413,'Minimum Value to Get Positive Step by Step Sum','Easy','algorithmic','1413.Minimum_Value_to_Get_Positive_Step_by_Step_Sum',1772323200);
INSERT INTO problems VALUES(1431,'Kids With the Greatest Number of Candies','Easy','algorithmic','1431.Kids_With_the_Greatest_Number_of_Candies',1767225600);
INSERT INTO problems VALUES(1441,'Build an Array With Stack Operations','Medium','algorithmic','1441.Build_an_Array_With_Stack_Operations',1767225600);
INSERT INTO problems VALUES(1470,'Shuffle the Array','Easy','algorithmic','1470.Shuffle_the_Array',1767225600);
INSERT INTO problems VALUES(1475,'Final Prices With a Special Discount in a Shop','Easy','algorithmic','1475.Final_Prices_With_a_Special_Discount_in_a_Shop',1767225600);
INSERT INTO problems VALUES(1518,'Water Bottles','Easy','algorithmic','1518.Water_Bottles',1769904000);
INSERT INTO problems VALUES(1550,'Three Consecutive Odds','Easy','algorithmic','1550.Three_Consecutive_Odds',1772323200);
INSERT INTO problems VALUES(1572,'Matrix Diagonal Sum','Easy','algorithmic','1572.Matrix_Diagonal_Sum',1772323200);
INSERT INTO problems VALUES(1581,'Customer Who Visited but Did Not Make Any Transactions',NULL,'sql','1581.Customer_Who_Visited_but_Did_Not_Make_Any_Transactions',1775001600);
INSERT INTO problems VALUES(1654,'Minimum Jumps to Reach Home','Medium','algorithmic','1654.Minimum_Jumps_to_Reach_Home',1772323200);
INSERT INTO problems VALUES(1661,'Average Time of Process per Machine',NULL,'sql','1661.Average_Time_of_Process_per_Machine',1775001600);
INSERT INTO problems VALUES(1679,'Max Number of K-Sum Pairs','Medium','algorithmic','1679.Max_Number_of_K-Sum_Pairs',1767225600);
INSERT INTO problems VALUES(1683,'Invalid Tweets',NULL,'sql','1683.Invalid_Tweets',1775001600);
INSERT INTO problems VALUES(1736,'Latest Time by Replacing Hidden Digits','Easy','algorithmic','1736.Latest_Time_by_Replacing_Hidden_Digits',1772323200);
INSERT INTO problems VALUES(1742,'Maximum Number of Balls in a Box','Easy','algorithmic','1742.Maximum_Number_of_Balls_in_a_Box',1772323200);
INSERT INTO problems VALUES(1757,'Recyclable and Low Fat Products',NULL,'sql','1757.Recyclable_and_Low_Fat_Products',1775001600);
INSERT INTO problems VALUES(1768,'Merge Strings Alternately','Easy','algorithmic','1768.Merge_Strings_Alternately',1767225600);
INSERT INTO problems VALUES(1796,'Second Largest Digit in a String','Easy','algorithmic','1796.Second_Largest_Digit_in_a_String',1772323200);
INSERT INTO problems VALUES(1929,'Concatenation of Array','Easy','algorithmic','1929.Concatenation_of_Array',1767225600);
INSERT INTO problems VALUES(2022,'Convert 1D Array Into 2D Array','Easy','algorithmic','2022.Convert_1D_Array_Into_2D_Array',1772323200);
INSERT INTO problems VALUES(2068,'Check Whether Two Strings are Almost Equivalent','Easy','algorithmic','2068.Check_Whether_Two_Strings_are_Almost_Equivalent',1772323200);
INSERT INTO problems VALUES(2108,'Find First Palindromic String in the Array','Easy','algorithmic','2108.Find_First_Palindromic_String_in_the_Array',1772323200);
INSERT INTO problems VALUES(2215,'Find the Difference of Two Arrays','Easy','algorithmic','2215.Find_the_Difference_of_Two_Arrays',1772323200);
INSERT INTO problems VALUES(2389,'Longest Subsequence With Limited Sum','Easy','algorithmic','2389.Longest_Subsequence_With_Limited_Sum',1772323200);
INSERT INTO problems VALUES(2540,'Minimum Common Value','Easy','algorithmic','2540.Minimum_Common_Value',1772323200);
INSERT INTO problems VALUES(3028,'Ant on the Boundary','Easy','algorithmic','3028.Ant_on_the_Boundary',1772323200);
INSERT INTO problems VALUES(3030,'Find the Grid of Region Average','Medium','algorithmic','3030.Find_the_Grid_of_Region_Average',1772323200);
INSERT INTO problems VALUES(3083,'Existence of a Substring in a String and Its Reverse','Easy','algorithmic','3083.Existence_of_a_Substring_in_a_String_and_Its_Reverse',1772323200);
INSERT INTO problems VALUES(3194,'Minimum Average of Smallest and Largest Elements','Easy','algorithmic','3194.Minimum_Average_of_Smallest_and_Largest_Elements',1772323200);
INSERT INTO problems VALUES(3325,'Count Substrings With K-Frequency Characters I','Medium','algorithmic','3325.Count_Substrings_With_K-Frequency_Characters_I',1772323200);
INSERT INTO problems VALUES(3364,'Minimum Positive Sum Subarray','Easy','algorithmic','3364.Minimum_Positive_Sum_Subarray',1772323200);
INSERT INTO problems VALUES(3396,'Minimum Number of Operations to Make Elements in Array Distinct','Easy','algorithmic','3396.Minimum_Number_of_Operations_to_Make_Elements_in_Array_Distinct',1772323200);
INSERT INTO problems VALUES(3803,'Count Residue Prefixes','Easy','algorithmic','3803.Count_Residue_Prefixes',1772323200);
CREATE TABLE attempts (
  id               INTEGER PRIMARY KEY,
  problem_number   INTEGER NOT NULL REFERENCES problems(number) ON DELETE CASCADE,
  started_at       INTEGER NOT NULL,      -- unix seconds
  duration_minutes INTEGER,                -- NULL while in progress
  revisit          INTEGER NOT NULL DEFAULT 0,   -- 0|1 — was a better solution flagged?
  UNIQUE (problem_number, started_at),
  CHECK (revisit IN (0, 1))
);
INSERT INTO attempts VALUES(1,1,1514764800,NULL,0);
INSERT INTO attempts VALUES(2,100,1772323200,NULL,0);
INSERT INTO attempts VALUES(3,1046,1772323200,NULL,0);
INSERT INTO attempts VALUES(4,1071,1767225600,NULL,0);
INSERT INTO attempts VALUES(5,110,1769904000,NULL,0);
INSERT INTO attempts VALUES(6,1114,1769904000,NULL,0);
INSERT INTO attempts VALUES(7,118,1769904000,NULL,0);
INSERT INTO attempts VALUES(8,119,1769904000,NULL,0);
INSERT INTO attempts VALUES(9,121,1769904000,NULL,0);
INSERT INTO attempts VALUES(10,125,1772323200,NULL,0);
INSERT INTO attempts VALUES(11,13,1514764800,NULL,0);
INSERT INTO attempts VALUES(12,1356,1769904000,NULL,0);
INSERT INTO attempts VALUES(13,136,1772323200,NULL,0);
INSERT INTO attempts VALUES(14,1365,1767225600,NULL,0);
INSERT INTO attempts VALUES(15,141,1772323200,NULL,0);
INSERT INTO attempts VALUES(16,1413,1772323200,NULL,0);
INSERT INTO attempts VALUES(17,1431,1767225600,NULL,0);
INSERT INTO attempts VALUES(18,1470,1767225600,NULL,0);
INSERT INTO attempts VALUES(19,1475,1767225600,NULL,0);
INSERT INTO attempts VALUES(20,1518,1769904000,NULL,0);
INSERT INTO attempts VALUES(21,1550,1772323200,NULL,0);
INSERT INTO attempts VALUES(22,1572,1772323200,NULL,0);
INSERT INTO attempts VALUES(23,1736,1772323200,NULL,0);
INSERT INTO attempts VALUES(24,1742,1772323200,NULL,0);
INSERT INTO attempts VALUES(25,1768,1767225600,NULL,0);
INSERT INTO attempts VALUES(26,1796,1772323200,NULL,0);
INSERT INTO attempts VALUES(27,191,1772323200,NULL,0);
INSERT INTO attempts VALUES(28,1929,1767225600,NULL,0);
INSERT INTO attempts VALUES(29,20,1519862400,NULL,0);
INSERT INTO attempts VALUES(30,2022,1772323200,NULL,0);
INSERT INTO attempts VALUES(31,206,1772323200,NULL,0);
INSERT INTO attempts VALUES(32,2068,1772323200,NULL,0);
INSERT INTO attempts VALUES(33,21,1772323200,NULL,0);
INSERT INTO attempts VALUES(34,2108,1772323200,NULL,0);
INSERT INTO attempts VALUES(35,2215,1772323200,NULL,0);
INSERT INTO attempts VALUES(36,231,1519862400,NULL,0);
INSERT INTO attempts VALUES(37,2389,1772323200,NULL,0);
INSERT INTO attempts VALUES(38,242,1772323200,NULL,0);
INSERT INTO attempts VALUES(39,2540,1772323200,NULL,0);
INSERT INTO attempts VALUES(40,257,1519862400,NULL,0);
INSERT INTO attempts VALUES(41,278,1772323200,NULL,0);
INSERT INTO attempts VALUES(42,28,1767225600,NULL,0);
INSERT INTO attempts VALUES(43,283,1767225600,NULL,0);
INSERT INTO attempts VALUES(44,3028,1772323200,NULL,0);
INSERT INTO attempts VALUES(45,3083,1772323200,NULL,0);
INSERT INTO attempts VALUES(46,3194,1772323200,NULL,0);
INSERT INTO attempts VALUES(47,326,1519862400,NULL,0);
INSERT INTO attempts VALUES(48,3364,1772323200,NULL,1);
INSERT INTO attempts VALUES(49,338,1772323200,NULL,0);
INSERT INTO attempts VALUES(50,3396,1772323200,NULL,0);
INSERT INTO attempts VALUES(51,344,1772323200,NULL,0);
INSERT INTO attempts VALUES(52,345,1522540800,NULL,0);
INSERT INTO attempts VALUES(53,35,1772323200,NULL,0);
INSERT INTO attempts VALUES(54,3803,1772323200,NULL,0);
INSERT INTO attempts VALUES(55,387,1519862400,NULL,0);
INSERT INTO attempts VALUES(56,389,1522540800,NULL,0);
INSERT INTO attempts VALUES(57,392,1767225600,NULL,0);
INSERT INTO attempts VALUES(58,409,1772323200,NULL,0);
INSERT INTO attempts VALUES(59,443,1767225600,NULL,0);
INSERT INTO attempts VALUES(60,448,1767225600,NULL,0);
INSERT INTO attempts VALUES(61,455,1772323200,NULL,0);
INSERT INTO attempts VALUES(62,463,1519862400,NULL,0);
INSERT INTO attempts VALUES(63,485,1767225600,NULL,0);
INSERT INTO attempts VALUES(64,496,1769904000,NULL,0);
INSERT INTO attempts VALUES(65,509,1769904000,NULL,0);
INSERT INTO attempts VALUES(66,561,1772323200,NULL,0);
INSERT INTO attempts VALUES(67,599,1772323200,NULL,0);
INSERT INTO attempts VALUES(68,605,1767225600,NULL,0);
INSERT INTO attempts VALUES(69,645,1767225600,NULL,0);
INSERT INTO attempts VALUES(70,657,1519862400,NULL,0);
INSERT INTO attempts VALUES(71,66,1519862400,NULL,0);
INSERT INTO attempts VALUES(72,661,1772323200,NULL,0);
INSERT INTO attempts VALUES(73,70,1769904000,NULL,0);
INSERT INTO attempts VALUES(74,703,1772323200,NULL,0);
INSERT INTO attempts VALUES(75,704,1772323200,NULL,1);
INSERT INTO attempts VALUES(76,733,1772323200,NULL,0);
INSERT INTO attempts VALUES(77,760,1514764800,NULL,0);
INSERT INTO attempts VALUES(78,771,1514764800,NULL,0);
INSERT INTO attempts VALUES(79,83,1772323200,NULL,0);
INSERT INTO attempts VALUES(80,852,1772323200,NULL,0);
INSERT INTO attempts VALUES(81,860,1772323200,NULL,0);
INSERT INTO attempts VALUES(82,9,1769904000,NULL,0);
INSERT INTO attempts VALUES(83,965,1772323200,NULL,0);
INSERT INTO attempts VALUES(84,11,1767225600,NULL,0);
INSERT INTO attempts VALUES(85,12,1767225600,NULL,0);
INSERT INTO attempts VALUES(86,133,1772323200,NULL,0);
INSERT INTO attempts VALUES(87,1404,1769904000,NULL,0);
INSERT INTO attempts VALUES(88,1441,1767225600,NULL,0);
INSERT INTO attempts VALUES(89,15,1769904000,NULL,0);
INSERT INTO attempts VALUES(90,150,1767225600,NULL,0);
INSERT INTO attempts VALUES(91,151,1767225600,NULL,0);
INSERT INTO attempts VALUES(92,153,1772323200,NULL,0);
INSERT INTO attempts VALUES(93,155,1519862400,NULL,0);
INSERT INTO attempts VALUES(94,16,1769904000,NULL,0);
INSERT INTO attempts VALUES(95,1654,1772323200,NULL,1);
INSERT INTO attempts VALUES(96,1679,1767225600,NULL,0);
INSERT INTO attempts VALUES(97,19,1772323200,NULL,1);
INSERT INTO attempts VALUES(98,2,1767225600,NULL,0);
INSERT INTO attempts VALUES(99,200,1772323200,NULL,0);
INSERT INTO attempts VALUES(100,207,1772323200,NULL,0);
INSERT INTO attempts VALUES(101,208,1519862400,NULL,0);
INSERT INTO attempts VALUES(102,215,1772323200,NULL,1);
INSERT INTO attempts VALUES(103,238,1767225600,NULL,0);
INSERT INTO attempts VALUES(104,280,1519862400,NULL,0);
INSERT INTO attempts VALUES(105,3,1767225600,NULL,0);
INSERT INTO attempts VALUES(106,3030,1772323200,NULL,1);
INSERT INTO attempts VALUES(107,316,1769904000,NULL,0);
INSERT INTO attempts VALUES(108,33,1772323200,NULL,1);
INSERT INTO attempts VALUES(109,3325,1772323200,NULL,0);
INSERT INTO attempts VALUES(110,334,1767225600,NULL,0);
INSERT INTO attempts VALUES(111,347,1772323200,NULL,0);
INSERT INTO attempts VALUES(112,39,1772323200,NULL,0);
INSERT INTO attempts VALUES(113,402,1769904000,NULL,0);
INSERT INTO attempts VALUES(114,406,1522540800,NULL,0);
INSERT INTO attempts VALUES(115,421,1522540800,NULL,0);
INSERT INTO attempts VALUES(116,456,1769904000,NULL,0);
INSERT INTO attempts VALUES(117,46,1772323200,NULL,0);
INSERT INTO attempts VALUES(118,5,1767225600,NULL,0);
INSERT INTO attempts VALUES(119,503,1769904000,NULL,0);
INSERT INTO attempts VALUES(120,535,1522540800,NULL,0);
INSERT INTO attempts VALUES(121,55,1769904000,NULL,0);
INSERT INTO attempts VALUES(122,56,1772323200,NULL,0);
INSERT INTO attempts VALUES(123,57,1772323200,NULL,0);
INSERT INTO attempts VALUES(124,581,1769904000,NULL,0);
INSERT INTO attempts VALUES(125,6,1767225600,NULL,0);
INSERT INTO attempts VALUES(126,636,1767225600,NULL,0);
INSERT INTO attempts VALUES(127,654,1769904000,NULL,0);
INSERT INTO attempts VALUES(128,7,1767225600,NULL,0);
INSERT INTO attempts VALUES(129,713,1772323200,NULL,0);
INSERT INTO attempts VALUES(130,731,1772323200,NULL,1);
INSERT INTO attempts VALUES(131,739,1767225600,NULL,0);
INSERT INTO attempts VALUES(132,769,1769904000,NULL,0);
INSERT INTO attempts VALUES(133,78,1772323200,NULL,0);
INSERT INTO attempts VALUES(134,8,1767225600,NULL,0);
INSERT INTO attempts VALUES(135,853,1769904000,NULL,0);
INSERT INTO attempts VALUES(136,901,1769904000,NULL,0);
INSERT INTO attempts VALUES(137,994,1772323200,NULL,0);
INSERT INTO attempts VALUES(138,84,1769904000,NULL,0);
INSERT INTO attempts VALUES(139,1068,1775001600,NULL,0);
INSERT INTO attempts VALUES(140,1148,1775001600,NULL,0);
INSERT INTO attempts VALUES(141,1378,1775001600,NULL,0);
INSERT INTO attempts VALUES(142,1581,1775001600,NULL,0);
INSERT INTO attempts VALUES(143,1661,1775001600,NULL,0);
INSERT INTO attempts VALUES(144,1683,1775001600,NULL,0);
INSERT INTO attempts VALUES(145,175,1775001600,NULL,0);
INSERT INTO attempts VALUES(146,1757,1775001600,NULL,0);
INSERT INTO attempts VALUES(147,176,1775001600,NULL,0);
INSERT INTO attempts VALUES(148,177,1775001600,NULL,0);
INSERT INTO attempts VALUES(149,181,1775001600,NULL,0);
INSERT INTO attempts VALUES(150,182,1775001600,NULL,0);
INSERT INTO attempts VALUES(151,183,1775001600,NULL,0);
INSERT INTO attempts VALUES(152,196,1775001600,NULL,0);
INSERT INTO attempts VALUES(153,197,1775001600,NULL,0);
INSERT INTO attempts VALUES(154,511,1775001600,NULL,0);
INSERT INTO attempts VALUES(155,577,1775001600,NULL,0);
INSERT INTO attempts VALUES(156,584,1775001600,NULL,0);
INSERT INTO attempts VALUES(157,586,1775001600,NULL,0);
INSERT INTO attempts VALUES(158,595,1775001600,NULL,0);
INSERT INTO attempts VALUES(159,596,1775001600,NULL,0);
CREATE TABLE patterns (
  problem_number INTEGER NOT NULL REFERENCES problems(number) ON DELETE CASCADE,
  pattern        TEXT NOT NULL,
  created_at     INTEGER NOT NULL          -- unix seconds; supports history per classification
);
INSERT INTO patterns VALUES(11,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(15,'Two Pointers',1769904000);
INSERT INTO patterns VALUES(16,'Two Pointers',1769904000);
INSERT INTO patterns VALUES(19,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(28,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(125,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(141,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(151,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(283,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(344,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(345,'Two Pointers',1522540800);
INSERT INTO patterns VALUES(392,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(443,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(1679,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(1768,'Two Pointers',1767225600);
INSERT INTO patterns VALUES(2108,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(2540,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(3194,'Two Pointers',1772323200);
INSERT INTO patterns VALUES(3,'Sliding Window',1767225600);
INSERT INTO patterns VALUES(485,'Sliding Window',1767225600);
INSERT INTO patterns VALUES(713,'Sliding Window',1772323200);
INSERT INTO patterns VALUES(3325,'Sliding Window',1772323200);
INSERT INTO patterns VALUES(3364,'Sliding Window',1772323200);
INSERT INTO patterns VALUES(33,'Binary Search',1772323200);
INSERT INTO patterns VALUES(35,'Binary Search',1772323200);
INSERT INTO patterns VALUES(153,'Binary Search',1772323200);
INSERT INTO patterns VALUES(278,'Binary Search',1772323200);
INSERT INTO patterns VALUES(704,'Binary Search',1772323200);
INSERT INTO patterns VALUES(852,'Binary Search',1772323200);
INSERT INTO patterns VALUES(2389,'Binary Search',1772323200);
INSERT INTO patterns VALUES(20,'Stack / Monotonic Stack',1519862400);
INSERT INTO patterns VALUES(84,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(150,'Stack / Monotonic Stack',1767225600);
INSERT INTO patterns VALUES(155,'Stack / Monotonic Stack',1519862400);
INSERT INTO patterns VALUES(316,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(402,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(456,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(496,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(503,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(581,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(636,'Stack / Monotonic Stack',1767225600);
INSERT INTO patterns VALUES(654,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(739,'Stack / Monotonic Stack',1767225600);
INSERT INTO patterns VALUES(853,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(901,'Stack / Monotonic Stack',1769904000);
INSERT INTO patterns VALUES(1441,'Stack / Monotonic Stack',1767225600);
INSERT INTO patterns VALUES(1475,'Stack / Monotonic Stack',1767225600);
INSERT INTO patterns VALUES(100,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(110,'BFS / DFS',1769904000);
INSERT INTO patterns VALUES(133,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(200,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(207,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(257,'BFS / DFS',1519862400);
INSERT INTO patterns VALUES(463,'BFS / DFS',1519862400);
INSERT INTO patterns VALUES(733,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(965,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(994,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(1654,'BFS / DFS',1772323200);
INSERT INTO patterns VALUES(5,'Dynamic Programming',1767225600);
INSERT INTO patterns VALUES(70,'Dynamic Programming',1769904000);
INSERT INTO patterns VALUES(118,'Dynamic Programming',1769904000);
INSERT INTO patterns VALUES(119,'Dynamic Programming',1769904000);
INSERT INTO patterns VALUES(509,'Dynamic Programming',1769904000);
INSERT INTO patterns VALUES(55,'Greedy',1769904000);
INSERT INTO patterns VALUES(121,'Greedy',1769904000);
INSERT INTO patterns VALUES(280,'Greedy',1519862400);
INSERT INTO patterns VALUES(334,'Greedy',1767225600);
INSERT INTO patterns VALUES(402,'Greedy',1769904000);
INSERT INTO patterns VALUES(406,'Greedy',1522540800);
INSERT INTO patterns VALUES(455,'Greedy',1772323200);
INSERT INTO patterns VALUES(605,'Greedy',1767225600);
INSERT INTO patterns VALUES(769,'Greedy',1769904000);
INSERT INTO patterns VALUES(860,'Greedy',1772323200);
INSERT INTO patterns VALUES(1431,'Greedy',1767225600);
INSERT INTO patterns VALUES(1736,'Greedy',1772323200);
INSERT INTO patterns VALUES(3396,'Greedy',1772323200);
INSERT INTO patterns VALUES(1,'Hash Map / Hash Set',1514764800);
INSERT INTO patterns VALUES(3,'Hash Map / Hash Set',1767225600);
INSERT INTO patterns VALUES(13,'Hash Map / Hash Set',1514764800);
INSERT INTO patterns VALUES(133,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(242,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(347,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(387,'Hash Map / Hash Set',1519862400);
INSERT INTO patterns VALUES(389,'Hash Map / Hash Set',1522540800);
INSERT INTO patterns VALUES(409,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(448,'Hash Map / Hash Set',1767225600);
INSERT INTO patterns VALUES(496,'Hash Map / Hash Set',1769904000);
INSERT INTO patterns VALUES(535,'Hash Map / Hash Set',1522540800);
INSERT INTO patterns VALUES(599,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(645,'Hash Map / Hash Set',1767225600);
INSERT INTO patterns VALUES(657,'Hash Map / Hash Set',1519862400);
INSERT INTO patterns VALUES(760,'Hash Map / Hash Set',1514764800);
INSERT INTO patterns VALUES(771,'Hash Map / Hash Set',1514764800);
INSERT INTO patterns VALUES(1742,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(1796,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(2068,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(2215,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(3083,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(3803,'Hash Map / Hash Set',1772323200);
INSERT INTO patterns VALUES(2,'Linked List',1767225600);
INSERT INTO patterns VALUES(19,'Linked List',1772323200);
INSERT INTO patterns VALUES(21,'Linked List',1772323200);
INSERT INTO patterns VALUES(83,'Linked List',1772323200);
INSERT INTO patterns VALUES(141,'Linked List',1772323200);
INSERT INTO patterns VALUES(206,'Linked List',1772323200);
INSERT INTO patterns VALUES(100,'Tree Traversal',1772323200);
INSERT INTO patterns VALUES(110,'Tree Traversal',1769904000);
INSERT INTO patterns VALUES(257,'Tree Traversal',1519862400);
INSERT INTO patterns VALUES(654,'Tree Traversal',1769904000);
INSERT INTO patterns VALUES(965,'Tree Traversal',1772323200);
INSERT INTO patterns VALUES(39,'Backtracking',1772323200);
INSERT INTO patterns VALUES(46,'Backtracking',1772323200);
INSERT INTO patterns VALUES(78,'Backtracking',1772323200);
INSERT INTO patterns VALUES(257,'Backtracking',1519862400);
INSERT INTO patterns VALUES(136,'Bit Manipulation',1772323200);
INSERT INTO patterns VALUES(191,'Bit Manipulation',1772323200);
INSERT INTO patterns VALUES(231,'Bit Manipulation',1519862400);
INSERT INTO patterns VALUES(326,'Bit Manipulation',1519862400);
INSERT INTO patterns VALUES(338,'Bit Manipulation',1772323200);
INSERT INTO patterns VALUES(389,'Bit Manipulation',1522540800);
INSERT INTO patterns VALUES(421,'Bit Manipulation',1522540800);
INSERT INTO patterns VALUES(1356,'Bit Manipulation',1769904000);
INSERT INTO patterns VALUES(1404,'Bit Manipulation',1769904000);
INSERT INTO patterns VALUES(215,'Heap / Priority Queue',1772323200);
INSERT INTO patterns VALUES(347,'Heap / Priority Queue',1772323200);
INSERT INTO patterns VALUES(703,'Heap / Priority Queue',1772323200);
INSERT INTO patterns VALUES(1046,'Heap / Priority Queue',1772323200);
INSERT INTO patterns VALUES(208,'Trie',1519862400);
INSERT INTO patterns VALUES(421,'Trie',1522540800);
INSERT INTO patterns VALUES(238,'Prefix Sum',1767225600);
INSERT INTO patterns VALUES(661,'Prefix Sum',1772323200);
INSERT INTO patterns VALUES(1365,'Prefix Sum',1767225600);
INSERT INTO patterns VALUES(1413,'Prefix Sum',1772323200);
INSERT INTO patterns VALUES(2389,'Prefix Sum',1772323200);
INSERT INTO patterns VALUES(3028,'Prefix Sum',1772323200);
INSERT INTO patterns VALUES(3803,'Prefix Sum',1772323200);
INSERT INTO patterns VALUES(6,'Math',1767225600);
INSERT INTO patterns VALUES(7,'Math',1767225600);
INSERT INTO patterns VALUES(8,'Math',1767225600);
INSERT INTO patterns VALUES(9,'Math',1769904000);
INSERT INTO patterns VALUES(12,'Math',1767225600);
INSERT INTO patterns VALUES(13,'Math',1514764800);
INSERT INTO patterns VALUES(66,'Math',1519862400);
INSERT INTO patterns VALUES(231,'Math',1519862400);
INSERT INTO patterns VALUES(326,'Math',1519862400);
INSERT INTO patterns VALUES(463,'Math',1519862400);
INSERT INTO patterns VALUES(1071,'Math',1767225600);
INSERT INTO patterns VALUES(1518,'Math',1769904000);
INSERT INTO patterns VALUES(1572,'Math',1772323200);
INSERT INTO patterns VALUES(56,'Sorting',1772323200);
INSERT INTO patterns VALUES(57,'Sorting',1772323200);
INSERT INTO patterns VALUES(406,'Sorting',1522540800);
INSERT INTO patterns VALUES(561,'Sorting',1772323200);
INSERT INTO patterns VALUES(1365,'Sorting',1767225600);
INSERT INTO patterns VALUES(6,'Design / Simulation',1767225600);
INSERT INTO patterns VALUES(155,'Design / Simulation',1519862400);
INSERT INTO patterns VALUES(208,'Design / Simulation',1519862400);
INSERT INTO patterns VALUES(463,'Design / Simulation',1519862400);
INSERT INTO patterns VALUES(535,'Design / Simulation',1522540800);
INSERT INTO patterns VALUES(636,'Design / Simulation',1767225600);
INSERT INTO patterns VALUES(657,'Design / Simulation',1519862400);
INSERT INTO patterns VALUES(703,'Design / Simulation',1772323200);
INSERT INTO patterns VALUES(731,'Design / Simulation',1772323200);
INSERT INTO patterns VALUES(853,'Design / Simulation',1769904000);
INSERT INTO patterns VALUES(901,'Design / Simulation',1769904000);
INSERT INTO patterns VALUES(1114,'Design / Simulation',1769904000);
INSERT INTO patterns VALUES(1441,'Design / Simulation',1767225600);
INSERT INTO patterns VALUES(1470,'Design / Simulation',1767225600);
INSERT INTO patterns VALUES(1550,'Design / Simulation',1772323200);
INSERT INTO patterns VALUES(1572,'Design / Simulation',1772323200);
INSERT INTO patterns VALUES(1736,'Design / Simulation',1772323200);
INSERT INTO patterns VALUES(1768,'Design / Simulation',1767225600);
INSERT INTO patterns VALUES(1796,'Design / Simulation',1772323200);
INSERT INTO patterns VALUES(1929,'Design / Simulation',1767225600);
INSERT INTO patterns VALUES(2022,'Design / Simulation',1772323200);
CREATE TABLE thresholds (
  difficulty TEXT PRIMARY KEY,             -- 'Easy' | 'Medium' | 'Hard'
  minutes    INTEGER NOT NULL
);
INSERT INTO thresholds VALUES('Easy',15);
INSERT INTO thresholds VALUES('Medium',30);
INSERT INTO thresholds VALUES('Hard',60);
CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
INSERT INTO settings VALUES('review_cooldown_days','7');
CREATE INDEX attempts_by_problem
  ON attempts(problem_number, started_at);
CREATE INDEX patterns_by_pattern
  ON patterns(pattern, problem_number);
CREATE VIEW retry_flags AS
WITH
cooldown_sec AS (
  SELECT COALESCE(
    (SELECT CAST(value AS INTEGER) FROM settings WHERE key = 'review_cooldown_days'),
    7
  ) * 86400 AS secs
),
latest AS (
  SELECT a.problem_number, a.started_at, a.duration_minutes, a.revisit
  FROM attempts a
  JOIN (
    SELECT problem_number, MAX(started_at) AS latest_started
    FROM attempts
    GROUP BY problem_number
  ) m
    ON m.problem_number = a.problem_number
   AND m.latest_started = a.started_at
)
SELECT
  p.number,
  p.title,
  p.difficulty,
  p.folder,
  latest.started_at AS flagged_at,
  CASE WHEN latest.duration_minutes IS NOT NULL
            AND latest.duration_minutes >= t.minutes
       THEN 1 ELSE 0 END AS timing_bad,
  CASE WHEN latest.revisit = 1
       THEN 1 ELSE 0 END AS complexity_bad,
  CASE WHEN latest.started_at IS NOT NULL
            AND (unixepoch() - latest.started_at) >= (SELECT secs FROM cooldown_sec)
       THEN 1 ELSE 0 END AS stale
FROM problems p
LEFT JOIN thresholds t ON t.difficulty = p.difficulty
LEFT JOIN latest       ON latest.problem_number = p.number
WHERE p.kind = 'algorithmic';
COMMIT;
